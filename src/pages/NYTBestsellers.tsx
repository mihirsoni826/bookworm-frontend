import { useEffect, useState } from "react";
import Search from "../components/Search";
import Book from "../models/Book";
import { fetchAllBestsellers } from "../services/BookwormService";
import { useLocation } from "react-router-dom";
import BookListCard from "../components/BookListCard";

let OG_BESTSELLERS: Book[] = [];

const NYTBestsellers = () => {
    // states
    const [bestsellers, setBestsellers] = useState<Book[]>([]);
    const [searchKey, setSearchKey] = useState<string>("");

    const location = useLocation();
    const books = location.state?.books as Book[] | undefined;

    // Load the initial bestsellers
    useEffect(() => {
        const loadBestsellers = async () => {
            try {
                if (!books || books.length === 0) {
                    const fetchedBooks = await fetchAllBestsellers();
                    setBestsellers(fetchedBooks);
                    OG_BESTSELLERS = fetchedBooks;
                }
            } catch (err) {
                console.log(err);
            }
        };

        // fetch bestsellers from backend api if books were not passed from parent component
        if (!books || books.length === 0) {
            loadBestsellers();
        } else {
            setBestsellers(books);
            OG_BESTSELLERS = books;
        }
    }, []);

    // update bestsellers list depending on search key
    useEffect(() => {
        setBestsellers((bestsellers) => {
            // if search key is empty, return the initial "complete" bestsellers
            if (searchKey === "") return OG_BESTSELLERS;

            // otherwise filter out the books based on title or author which include search key
            return OG_BESTSELLERS.filter((book) => {
                return (
                    book.title
                        .toLowerCase()
                        .includes(searchKey.toLowerCase()) ||
                    book.author.toLowerCase().includes(searchKey.toLowerCase())
                );
            });
        });
    }, [searchKey]);

    const handleFavoriteStatusChange = (updatedBook: Book) => {
        // Update the list of bestsellers to reflect the change in favorite status
        const updatedBestsellers = bestsellers.map((book) => {
            if (book.isbn === updatedBook.isbn) {
                return updatedBook; // Update the book with the new favorite status
            }
            return book;
        });
        setBestsellers(updatedBestsellers);
    };

    function searchResults(key: string | undefined): void {
        if (key !== undefined) setSearchKey(key);
    }

    return (
        <div className="container-sm w-2/3 mx-auto py-32">
            <h1 className="text-xl font-bold mb-12 text-midnight-indigo">
                New York Times Bestsellers
            </h1>
            <Search placeholder="Search" onSearch={searchResults} />
            <div className="pt-10" />
            <div className="flex flex-col">
                {bestsellers.length === 0 ? (
                    <div>No books found</div>
                ) : (
                    <ul className="space-y-5 ">
                        {bestsellers.map((book) => (
                            <li key={book.isbn}>
                                <BookListCard
                                    book={book}
                                    onFavoriteStatusChange={
                                        handleFavoriteStatusChange
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default NYTBestsellers;

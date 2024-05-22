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
    const [error, setError] = useState<boolean>(false);

    const location = useLocation();
    const books = location.state?.books as Book[] | undefined;
    const book = location.state?.book as Book;

    /**
     * Load the initial bestsellers from the location object, if present otherwise fetch them from the server
     * Executed once when the component is mounted
     */
    useEffect(() => {
        const loadBestsellers = async () => {
            try {
                if (!books || books.length === 0) {
                    const fetchedBooks = await fetchAllBestsellers();
                    setBestsellers(fetchedBooks);
                    OG_BESTSELLERS = fetchedBooks;
                    setError(false);
                }
            } catch (err) {
                setError(true);
                console.log(err);
            }
        };

        // fetch bestsellers from backend api if books were not passed from parent component
        if (!books || books.length === 0) {
            loadBestsellers();
        } else {
            setBestsellers(books);
            OG_BESTSELLERS = books;
            setError(false);
        }
    }, []);

    /**
     * Update the bestsellers list depending on the search key matching the title or author
     * Executed every time the search key changes
     */
    useEffect(() => {
        setBestsellers(() => {
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

    /**
     * Updates the bestsellers list when the book is changed from the BookView page
     */
    useEffect(() => {
        if (book) {
            setBestsellers(() => {
                return OG_BESTSELLERS.map((oldBook) => {
                    if (oldBook.isbn === book.isbn) return book;
                    return oldBook;
                });
            });
        }
    }, [book]);

    /**
     * Sets the search key state when the search key changes
     * @param key - the search key
     */
    function searchResults(key: string | undefined): void {
        if (key !== undefined) setSearchKey(key);
    }

    return (
        <div className="container-sm w-2/3 mx-auto py-32">
            <h1 className="text-xl font-bold mb-12 text-midnight-indigo">
                New York Times Bestsellers
            </h1>
            {error ? (
                <div>Error fetching bestsellers</div>
            ) : (
                <div>
                    <Search placeholder="Search" onSearch={searchResults} />
                    <div className="pt-10" />
                    <div className="flex flex-col">
                        {bestsellers.length === 0 ? (
                            <div>No books found</div>
                        ) : (
                            <ul className="space-y-5 ">
                                {bestsellers.map((book) => (
                                    <li key={book.isbn}>
                                        <BookListCard book={book} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NYTBestsellers;

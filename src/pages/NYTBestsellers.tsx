import { useEffect, useState } from "react";
import Search from "../components/Search";
import Book from "../models/Book";
import { fetchAllBestsellers } from "../services/BookwormService";
import { useLocation } from "react-router-dom";
import BookListCard from "../components/BookListCard";

const NYTBestsellers = () => {
    const [bestsellers, setBestsellers] = useState<Book[]>([]);
    const location = useLocation();
    const books = location.state?.books as Book[] | undefined;

    useEffect(() => {
        const loadBestsellers = async () => {
            try {
                if (!books || books.length === 0) {
                    const fetchedBooks = await fetchAllBestsellers();
                    setBestsellers(fetchedBooks);
                }
            } catch (err) {
                console.log(err);
            }
        };

        // Only load bestsellers if books are not already set
        if (!books || books.length === 0) {
            loadBestsellers();
        } else setBestsellers(books);
    }, []);

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

    return (
        <div className="container-sm w-2/3 mx-auto py-32">
            <h1 className="text-xl font-bold mb-12 text-midnight-indigo">
                New York Times Bestsellers
            </h1>
            <Search placeholder="Search" />
            <div className="pt-10" />
            <div className="flex flex-col">
                {bestsellers.length === 0 ? (
                    <div>No books found</div>
                ) : (
                    <ul className="space-y-5 ">
                        {bestsellers.map((book) => (
                            <>
                                <BookListCard
                                    book={book}
                                    onFavoriteStatusChange={
                                        handleFavoriteStatusChange
                                    }
                                />
                            </>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default NYTBestsellers;

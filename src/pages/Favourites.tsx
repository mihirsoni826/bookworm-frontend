import React, { useEffect } from "react";
import BookListCard from "../components/BookListCard";
import Search from "../components/Search";
import Book from "../models/Book";
import { useLocation } from "react-router-dom";
import { fetchAllFavourites } from "../services/BookwormService";

let OG_FAVOURITES: Book[] = [];

const Favourites = () => {
    // states
    const [favourites, setFavourites] = React.useState<Book[]>([]);
    const [searchKey, setSearchKey] = React.useState<string>("");
    const [error, setError] = React.useState<boolean>(false);

    const location = useLocation();
    const books = location.state?.books as Book[] | undefined;
    const book = location.state?.book as Book;

    /**
     * Load the initial favourites from the location object, if present otherwise fetch them from the server
     * Executed once when the component is mounted
     */
    useEffect(() => {
        const loadFavourites = async () => {
            try {
                if (!books || books.length === 0) {
                    const fetchedBooks = await fetchAllFavourites();
                    setFavourites(fetchedBooks);
                    OG_FAVOURITES = fetchedBooks;
                    setError(false);
                }
            } catch (err) {
                console.log(err);
                setError(true);
            }
        };

        // fetch favourites from backend api if books were not passed from parent component
        if (!books || books.length === 0) {
            loadFavourites();
        } else {
            setFavourites(books);
            OG_FAVOURITES = books;
            setError(false);
        }
    }, []);

    /**
     * Update the favourites list depending on the search key matching the title or author
     * Executed every time the search key changes
     */
    useEffect(() => {
        setFavourites(() => {
            // if search key is empty, return the initial "complete" favourites
            if (searchKey === "") return OG_FAVOURITES;

            return OG_FAVOURITES.filter((book) => {
                return (
                    book.title
                        .toLowerCase()
                        .includes(searchKey.toLowerCase()) ||
                    book.author.toLowerCase().includes(searchKey.toLowerCase())
                );
            });
        });
    }, [searchKey]);

    useEffect(() => {
        if (book) {
            setFavourites(() => {
                return OG_FAVOURITES.map((oldBook) => {
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
        <div className="container-sm w-2/3 mx-auto py-32 h-screen">
            <h1 className="text-xl font-bold mb-12 text-midnight-indigo">
                Favourites
            </h1>
            {error ? (
                <div>Error fetching favourites</div>
            ) : (
                <div>
                    <Search placeholder="Search" onSearch={searchResults} />
                    <div className="pt-20" />
                    <div className="flex flex-col">
                        {favourites.length === 0 ? (
                            <div>No favourties added yet</div>
                        ) : (
                            <ul className="space-y-5 ">
                                {favourites.map((book) => (
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

export default Favourites;

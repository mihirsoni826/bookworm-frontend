import React, { useEffect } from "react";
import BookListCard from "../components/BookListCard";
import Search from "../components/Search";
import Book from "../models/Book";
import { useLocation } from "react-router-dom";
import { fetchAllFavourites } from "../services/BookwormService";

let OG_FAVOURITES: Book[] = [];

const Favourites = () => {
    const [favourites, setFavourites] = React.useState<Book[]>([]);
    const [searchKey, setSearchKey] = React.useState<string>("");
    const location = useLocation();
    const books = location.state?.books as Book[] | undefined;

    useEffect(() => {
        const loadFavourites = async () => {
            try {
                if (!books || books.length === 0) {
                    const fetchedBooks = await fetchAllFavourites();
                    setFavourites(fetchedBooks);
                    OG_FAVOURITES = fetchedBooks;
                }
            } catch (err) {
                console.log(err);
            }
        };

        // Only load bestsellers if books are not already set
        if (!books || books.length === 0) {
            loadFavourites();
        } else {
            setFavourites(books);
            OG_FAVOURITES = books;
        }
    }, []);

    useEffect(() => {
        setFavourites((favourites) => {
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

    const handleFavoriteStatusChange = (updatedBook: Book) => {
        console.log("Favourites.tsx - callback called", updatedBook);
    };

    function searchResults(key: string | undefined): void {
        if (key !== undefined) setSearchKey(key);
    }

    return (
        <div className="container-sm w-2/3 mx-auto py-32 h-screen">
            <h1 className="text-xl font-bold mb-12 text-midnight-indigo">
                Favourites
            </h1>
            <Search placeholder="Search" onSearch={searchResults} />
            <div className="pt-20" />
            <div className="flex flex-col">
                {favourites.length === 0 ? (
                    <div>No favourties added yet</div>
                ) : (
                    <ul className="space-y-5 ">
                        {favourites.map((book) => (
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

export default Favourites;

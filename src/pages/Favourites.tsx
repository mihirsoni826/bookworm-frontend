import React, { useEffect } from "react";
import BookListCard from "../components/BookListCard";
import Search from "../components/Search";
import Book from "../models/Book";
import { useLocation } from "react-router-dom";
import { fetchAllFavourites } from "../services/BookwormService";

const Favourites = () => {
    const [favourites, setFavourites] = React.useState<Book[]>([]);
    const location = useLocation();
    const books = location.state?.books as Book[] | undefined;

    useEffect(() => {
        const loadFavourites = async () => {
            try {
                if (!books || books.length === 0) {
                    const fetchedBooks = await fetchAllFavourites();
                    setFavourites(fetchedBooks);
                }
            } catch (err) {
                console.log(err);
            }
        };

        // Only load bestsellers if books are not already set
        if (!books || books.length === 0) {
            loadFavourites();
        } else setFavourites(books);
    }, []);

    const handleFavoriteStatusChange = (updatedBook: Book) => {
        console.log("Favourites.tsx - callback called", updatedBook);
    };

    return (
        <div className="container-sm w-2/3 mx-auto py-32 h-screen">
            <h1 className="text-xl font-bold mb-12 text-midnight-indigo">
                Favourites
            </h1>
            <Search placeholder="Search" />
            <div className="pt-20" />
            <div className="flex flex-col">
                {favourites.length === 0 ? (
                    <div>No favourties added yet</div>
                ) : (
                    <ul className="space-y-5 ">
                        {favourites.map((book) => (
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

export default Favourites;

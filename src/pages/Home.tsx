import { useEffect, useState } from "react";
import BookGallery from "../components/BookGallery";
import Search from "../components/Search";
import Book from "../models/Book";
import {
    fetchAllBestsellers,
    fetchAllFavourites,
} from "../services/BookwormService";

// global variables to store the initial "complete" bestsellers and favourites
let OG_BESTSELLERS: Book[] = [];
let OG_FAVOURITES: Book[] = [];

/**
 * Home page of the app - displays the bestsellers and favourites books in a static carousel format
 * Number of books displayed is responsive of screen size
 * @returns nothing
 */
export default function Home() {
    // states
    const [bestsellers, setBestsellers] = useState<Book[]>([]);
    const [favourites, setFavourites] = useState<Book[]>([]);
    const [searchKey, setSearchKey] = useState<string>("");
    const [loadingBestSellers, setLoadingBestSellers] = useState<boolean>(true);
    const [loadingFavourites, setLoadingFavourites] = useState<boolean>(true);

    /**
     * Fetch the bestsellers and favourites books from the server
     * Executed once when the component is mounted
     */
    useEffect(() => {
        const loadBestsellers = async () => {
            try {
                const fetchedBooks = await fetchAllBestsellers();
                setBestsellers(fetchedBooks);
                OG_BESTSELLERS = fetchedBooks;
                setLoadingBestSellers(false);
            } catch (err: any) {
                console.log(err.message);
            }
        };

        const loadFavourites = async () => {
            try {
                const fetchedBooks = await fetchAllFavourites();
                setFavourites(fetchedBooks);
                OG_FAVOURITES = fetchedBooks;
                setLoadingFavourites(false);
            } catch (err: any) {
                console.log(err.message);
            }
        };

        loadBestsellers();
        loadFavourites();
    }, []);

    /**
     * Filter the books based on the search key
     * Executed every time the search key changes
     */
    useEffect(() => {
        /**
         * Set the bestsellers to be the initial "complete" bestsellers if the search key is empty
         * otherwise filter the books on title and author including the search key
         */
        setBestsellers(() => {
            if (searchKey === "") return OG_BESTSELLERS;

            return OG_BESTSELLERS.filter((book) => {
                return (
                    book.title
                        .toLowerCase()
                        .includes(searchKey.toLowerCase()) ||
                    book.author.toLowerCase().includes(searchKey.toLowerCase())
                );
            });
        });

        /**
         * Set the favourites to be the initial "complete" favourites if the search key is empty
         * otherwise filter the books on title and author including the search key
         */
        setFavourites(() => {
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

    /**
     * Callback function to update the search key when the user types in the search box
     * Executed from within the Search component
     * @param key - the search key
     */
    function searchResults(key: string | undefined): void {
        if (key !== undefined) setSearchKey(key);
    }

    return (
        <div className="container-sm w-3/4 mx-auto pt-20 h-screen">
            <div className="w-full md:w-3/4 pt-6">
                <Search
                    placeholder="What books would you like to find?"
                    onSearch={searchResults}
                />
            </div>
            <div className="pt-20" />
            <BookGallery
                heading="New York Times Bestsellers"
                books={bestsellers}
                path="bestsellers"
                isLoading={loadingBestSellers}
            />
            <div className="pt-14" />
            <BookGallery
                heading="Favourites"
                books={favourites}
                path="favourites"
                isLoading={loadingFavourites}
            />
        </div>
    );
}

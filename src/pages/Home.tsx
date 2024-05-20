import { useEffect, useState } from "react";
import BookGallery from "../components/BookGallery";
import Search from "../components/Search";
import Book from "../models/Book";
import {
    fetchAllBestsellers,
    fetchAllFavourites,
} from "../services/BookwormService";

// global variables to store the initial "complete" bestsellers and favourites books
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

    // execute once when the component is mounted to fetch the bestsellers and favourites
    useEffect(() => {
        const loadBestsellers = async () => {
            try {
                const fetchedBooks = await fetchAllBestsellers();
                setBestsellers(fetchedBooks);
                OG_BESTSELLERS = fetchedBooks;
                setLoadingBestSellers(fetchedBooks.length !== 0 ? false : true);
            } catch (err: any) {
                console.log(err.message);
            }
        };

        const loadFavourites = async () => {
            try {
                const fetchedBooks = await fetchAllFavourites();
                setFavourites(fetchedBooks);
                OG_FAVOURITES = fetchedBooks;
                setLoadingFavourites(fetchedBooks.length !== 0 ? false : true);
            } catch (err: any) {
                console.log(err.message);
            }
        };

        loadBestsellers();
        loadFavourites();
    }, []);

    useEffect(() => {
        setBestsellers((bestsellers) => {
            // if search key is empty, return the initial "complete" bestsellers
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

    function searchResults(key: string | undefined): void {
        if (key !== undefined) setSearchKey(key);
    }

    return (
        <div className="container-sm w-3/4 mx-auto pt-20 h-screen">
            <div className="w-3/4 pt-6">
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

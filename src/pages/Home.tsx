import { useEffect, useState } from "react";
import BookGallery from "../components/BookGallery";
import Search from "../components/Search";
import Book from "../models/Book";
import {
    fetchAllBestsellers,
    fetchAllFavourites,
} from "../services/BookwormService";

export default function Home() {
    const [bestsellers, setBestsellers] = useState<Book[]>([]);
    const [favourites, setFavourites] = useState<Book[]>([]);

    useEffect(() => {
        const loadBestsellers = async () => {
            try {
                const fetchedBooks = await fetchAllBestsellers();
                setBestsellers(fetchedBooks);
            } catch (err: any) {
                console.log(err.message);
            }
        };

        const loadFavourites = async () => {
            try {
                const fetchedBooks = await fetchAllFavourites();
                setFavourites(fetchedBooks);
            } catch (err: any) {
                console.log(err.message);
            }
        };

        loadBestsellers();
        loadFavourites();
    }, []);

    return (
        <div className="container-sm w-3/4 mx-auto pt-20">
            <Search placeholder="What books would you like to find?" />
            <div className="pt-20" />
            <BookGallery
                heading="New York Times Bestsellers"
                books={bestsellers}
            />
            <div className="pt-14" />
            <BookGallery heading="Favourites" books={favourites} />
        </div>
    );
}

/*
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-icy-whisper font-sans">
                <Titlebar />
                <div className="container-sm w-3/4 mx-auto pt-20">
                    <Search placeholder="What books would you like to find?" />
                    <div className="pt-20" />
                    <BookGallery
                        heading="New York Times Bestsellers"
                        books={bestsellers}
                    />
                    <div className="pt-14" />
                    <BookGallery heading="Favourites" books={favourites} />
                </div>
            </div>
        </div>
    );
*/

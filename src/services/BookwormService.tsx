import Book from "../models/Book";

const API_URL = import.meta.env.VITE_BOOKWORK_INTERNAL_API_BASE_URL;

export const fetchAllBestsellers = async (): Promise<Book[]> => {
    try {
        const response = await fetch(`${API_URL}/get-all-bestsellers`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const books: Book[] = await response.json();
        return books;
    } catch (error) {
        console.error("Failed to fetch all bestsellers: ", error);
        throw error;
    }
};

export const fetchAllFavourites = async (): Promise<Book[]> => {
    try {
        const response = await fetch(`${API_URL}/get-favourites`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const books: Book[] = await response.json();
        return books;
    } catch (error) {
        console.error("Failed to fetch favourites: ", error);
        throw error;
    }
};

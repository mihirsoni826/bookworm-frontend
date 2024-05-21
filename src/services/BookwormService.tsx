import Book from "../models/Book";

// base url for the bookworm api from the env variables
const API_URL = import.meta.env.VITE_BOOKWORK_INTERNAL_API_BASE_URL;

/**
 * Fetches all bestsellers from the bookworm api
 * @returns list of bestsellers
 */
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

/**
 * Fetches all favourites from the bookworm api
 * @returns list of favourites
 */
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

/**
 * Calls the bookworm api to add a book to favourites
 * @param book book to add to favourites
 */
export const addToFavourites = async (book: Book) => {
    try {
        const response = await fetch(`${API_URL}/add-to-favourites`, {
            method: "POST",
            body: JSON.stringify(book),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error("Failed to add to favourites: ", error);
        throw error;
    }
};

/**
 * Calls the bookworm api to remove a book from favourites
 * @param book book to remove from favourites
 */
export const removeFromFavourites = async (book: Book) => {
    try {
        const response = await fetch(`${API_URL}/remove-from-favourites`, {
            method: "DELETE",
            body: JSON.stringify(book),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error("Failed to remove from favourites: ", error);
        throw error;
    }
};

/**
 * Calls the bookworm api to update the rating and price of a book
 * @param book book to update
 */
export const updateRatingAndPrice = async (book: Book) => {
    try {
        const response = await fetch(`${API_URL}/update-rating-and-price`, {
            method: "PUT",
            body: JSON.stringify(book),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error("Failed to update rating and price: ", error);
        throw error;
    }
};

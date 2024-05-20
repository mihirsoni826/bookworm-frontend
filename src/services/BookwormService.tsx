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

/*
export const fetchBookFromIsbn = async (isbn: string) => {
    try {
        const response = await fetch(`${API_URL}/book/${isbn}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const book: Book = await response.json();
        return book;
    } catch (error) {
        console.error("Failed to fetch book: ", error);
        throw error;
    }
};
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

// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

export const handlers = [
    // Intercept "GET https://example.com/user" requests...
    http.get(import.meta.env.VITE_API_URL + "/get-all-bestsellers", () => {
        // ...and respond to them using this JSON response.
        return HttpResponse.json([
            {
                isbn: "9781728289755",
                title: "KING OF SLOTH",
                author: "Ana Huang",
                rating: 1,
                imageUrl:
                    "https://storage.googleapis.com/du-prd/books/images/9781728289755.jpg",
                price: 5,
                listName: "Combined Print and E-Book Fiction",
                encodedListName: "combined-print-and-e-book-fiction",
                ratingPriceChanged: false,
                favourite: false,
            },
            {
                isbn: "9781635575606",
                title: "A COURT OF WINGS AND RUIN",
                author: "Sarah J. Maas",
                rating: 1,
                imageUrl:
                    "https://storage.googleapis.com/du-prd/books/images/9781635575606.jpg",
                price: 14,
                listName: "Combined Print and E-Book Fiction",
                encodedListName: "combined-print-and-e-book-fiction",
                ratingPriceChanged: false,
                favourite: false,
            },
        ]);
    }),
];

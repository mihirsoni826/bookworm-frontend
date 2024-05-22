import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/Home";
import { BrowserRouter } from "react-router-dom";
import { NavigationProvider } from "../context/NavigationProvider";

beforeEach(() => {
    render(
        <NavigationProvider>
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        </NavigationProvider>
    );
});

describe("Home", () => {
    it("should have headings for bestsellers and favourites", async () => {
        await waitFor(() => {
            expect(
                screen.getByText("New York Times Bestsellers")
            ).toBeInTheDocument();
            expect(screen.getByText("Favourites")).toBeInTheDocument();
        });
    });

    it("should have a search box with button and a placeholder", () => {
        const searchBox = screen.getByRole("textbox");
        const searchButton = screen.getByRole("button");
        const placegholder = screen.getByPlaceholderText(
            "What books would you like to find?"
        );

        expect(searchBox).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
        expect(placegholder).toBeInTheDocument();
    });

    it("should have a loading text when the bestsellers and favouritesare loading", async () => {
        const loadingBestsellers = screen.getByText(/bestsellers\.{3}/i);
        const loadingFavourites = screen.getByText(/favourites\.{3}/i);

        expect(loadingBestsellers).toBeInTheDocument();
        expect(loadingFavourites).toBeInTheDocument();
    });
});

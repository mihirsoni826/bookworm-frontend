import { render, screen, waitFor } from "@testing-library/react";
import NYTBestsellers from "../pages/NYTBestsellers";
import { NavigationProvider } from "../context/NavigationProvider";
import { BrowserRouter } from "react-router-dom";

describe("NYT Bestsellers", () => {
    beforeEach(() => {
        render(
            <NavigationProvider>
                <BrowserRouter>
                    <NYTBestsellers />
                </BrowserRouter>
            </NavigationProvider>
        );
    });

    it("should show the page heading", async () => {
        await waitFor(() => {
            screen.debug();
        });
    });

    it("should show a list of favourites", async () => {});
});

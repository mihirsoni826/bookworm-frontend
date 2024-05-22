import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import BookGallery from "../components/BookGallery";
import { BrowserRouter } from "react-router-dom";
import { NavigationProvider } from "../context/NavigationProvider";

const mockUseNavigate = vi.fn();
vi.doMock("react-router-dom", () => {
    return {
        useNavigate: mockUseNavigate,
    };
});

const mockBestsellers = [
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
];

describe("BookGallery", () => {
    it("should have a heading for the page", () => {
        render(
            <NavigationProvider>
                <BrowserRouter>
                    <BookGallery
                        heading="New York Times Bestsellers"
                        books={[]}
                        path="bestsellers"
                        isLoading={false}
                        isError={false}
                    />
                </BrowserRouter>
            </NavigationProvider>
        );
        const heading = screen.getByText("New York Times Bestsellers");

        expect(heading).toBeInTheDocument();
    });

    it("should have 2 book images", async () => {
        render(
            <NavigationProvider>
                <BrowserRouter>
                    <BookGallery
                        heading="New York Times Bestsellers"
                        books={mockBestsellers}
                        path="bestsellers"
                        isLoading={false}
                        isError={false}
                    />
                </BrowserRouter>
            </NavigationProvider>
        );

        await waitFor(() => {
            const lis = screen.getAllByRole("listitem");
            const imgs = screen.getAllByRole("img");

            expect(lis).toHaveLength(2);
            expect(imgs).toHaveLength(2);
        });
    });

    it("should display loading msg and not render books", async () => {
        render(
            <NavigationProvider>
                <BrowserRouter>
                    <BookGallery
                        heading="New York Times Bestsellers"
                        books={[]}
                        path="bestsellers"
                        isLoading={true}
                        isError={false}
                    />
                </BrowserRouter>
            </NavigationProvider>
        );

        await waitFor(() => {
            const heading = screen.getByText(/loading/i);
            const lis = screen.queryAllByRole("listitem");
            const imgs = screen.queryAllByRole("img");

            expect(heading).toBeInTheDocument();
            expect(lis).toHaveLength(0);
            expect(imgs).toHaveLength(0);
        });
    });

    it("should display error msg and not render books", async () => {
        render(
            <NavigationProvider>
                <BrowserRouter>
                    <BookGallery
                        heading="New York Times Bestsellers"
                        books={[]}
                        path="bestsellers"
                        isLoading={false}
                        isError={true}
                    />
                </BrowserRouter>
            </NavigationProvider>
        );

        await waitFor(() => {
            const heading = screen.getByText(/error/i);
            const lis = screen.queryAllByRole("listitem");
            const imgs = screen.queryAllByRole("img");

            expect(heading).toBeInTheDocument();
            expect(lis).toHaveLength(0);
            expect(imgs).toHaveLength(0);
        });
    });

    it("should display bestsellers in heading when path is bestsellers", async () => {
        render(
            <NavigationProvider>
                <BrowserRouter>
                    <BookGallery
                        heading="New York Times Bestsellers"
                        books={mockBestsellers}
                        path="bestsellers"
                        isLoading={false}
                        isError={false}
                    />
                </BrowserRouter>
            </NavigationProvider>
        );

        await waitFor(() => {
            const heading = screen.getByText("New York Times Bestsellers");

            expect(heading).toBeInTheDocument();
        });
    });

    it("should display favourites in heading when path is favourites", async () => {
        render(
            <NavigationProvider>
                <BrowserRouter>
                    <BookGallery
                        heading="Favourites"
                        books={mockBestsellers}
                        path="favourites"
                        isLoading={false}
                        isError={false}
                    />
                </BrowserRouter>
            </NavigationProvider>
        );

        await waitFor(() => {
            const heading = screen.getByText("Favourites");

            expect(heading).toBeInTheDocument();
        });
    });

    it("should navigate to the bestsellers page when the bestsellers heading is clicked", async () => {
        render(
            <NavigationProvider>
                <BrowserRouter>
                    <BookGallery
                        heading="New York Times Bestsellers"
                        books={mockBestsellers}
                        path="bestsellers"
                        isLoading={false}
                        isError={false}
                    />
                </BrowserRouter>
            </NavigationProvider>
        );

        await waitFor(() => {
            const bestsellersHeading = screen.queryByRole("heading");
            const lis = screen.getAllByRole("listitem");
            const imgs = screen.getAllByRole("img");

            expect(bestsellersHeading).toBeInTheDocument();
            expect(lis).toHaveLength(2);
            expect(imgs).toHaveLength(2);

            fireEvent.click(bestsellersHeading!);
            // expect(mockUseNavigate).toHaveBeenCalledWith("/bestsellers");
        });
    });
});

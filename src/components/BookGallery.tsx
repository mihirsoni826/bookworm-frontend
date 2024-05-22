import { useNavigate } from "react-router-dom";
import Book from "../models/Book";
import { useNavigation } from "../context/NavigationProvider";

const BookGallery = ({
    heading,
    books,
    path,
    isLoading,
    isError,
}: {
    heading: string;
    books: Book[];
    path: string;
    isLoading: boolean;
    isError: boolean;
}) => {
    const navigate = useNavigate();
    const { setCanAccess } = useNavigation(); // context provider to set the canAccess state

    /**
     * Function to navigate to the bestsellers or favourites page based on the path prop
     */
    function handleClick(): void {
        if (path === "bestsellers")
            navigate("/bestsellers", {
                state: { books },
            });
        else if (path === "favourites")
            navigate("/favourites", { state: { books } });
    }

    /**
     * Function to navigate to the book view page when a book card is clicked
     * @param book - the book object
     */
    function navigateToBookView(book: Book): void {
        setCanAccess(true); // set the canAccess state to true to allow access to the book view page
        navigate("/book/" + book.isbn, { state: { book } });
    }

    return (
        <div>
            <h1
                className="text-xl w-fit font-bold mb-3 text-midnight-indigo cursor-pointer hover:underline hover:underline-offset-8"
                onClick={handleClick}
            >
                {heading}
            </h1>
            {isLoading ? (
                <div>Loading {path}...</div>
            ) : isError ? (
                <div>Error fetching {path}</div>
            ) : books.length === 0 ? (
                path === "bestsellers" ? (
                    <div>No {path} found</div>
                ) : (
                    <div>No favourties added yet</div>
                )
            ) : (
                <div className="w-full h-60 overflow-hidden">
                    <div className="flex whitespace-nowrap flex-row">
                        <ul>
                            {books.map((book) => (
                                <li
                                    key={book.isbn}
                                    className="inline-block"
                                    onClick={() => navigateToBookView(book)}
                                >
                                    <img
                                        src={book.imageUrl}
                                        alt={`${book.title} by ${book.author}`}
                                        className="w-auto h-60 mr-5 md:mr-10 cursor-pointer transition ease-in-out hover:scale-95 duration-200"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookGallery;

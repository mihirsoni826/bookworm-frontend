import { useNavigate } from "react-router-dom";
import Book from "../models/Book";
import { useNavigation } from "../context/NavigationProvider";

const BookGallery = ({
    heading,
    books,
    path,
    isLoading,
}: {
    heading: string;
    books: Book[];
    path: string;
    isLoading: boolean;
}) => {
    const navigate = useNavigate();
    const { setCanAccess } = useNavigation();

    // navigate to bestsellers or the favourites page based on the path prop
    function handleClick(): void {
        if (path === "bestsellers")
            navigate("/bestsellers", {
                state: { books },
            });
        else if (path === "favourites")
            navigate("/favourites", { state: { books } });
    }

    // navigate to the book view page when a book card is clicked
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
                <div>Loading {path} books...</div>
            ) : (
                <div className="overflow-hidden w-full h-60">
                    <div className="flex flex-row flex-nowrap">
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
                                        className="w-auto h-60 mr-10 cursor-pointer transition ease-in-out hover:scale-95 duration-200"
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

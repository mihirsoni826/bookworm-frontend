import { useNavigate } from "react-router-dom";
import Book from "../models/Book";

const BookGallery = ({
    heading,
    books,
    path,
}: {
    heading: string;
    books: Book[];
    path: string;
}) => {
    const navigate = useNavigate();

    // navigate to bestsellers or the favourites page
    function handleClick() {
        if (path === "bestsellers")
            navigate("/bestsellers", {
                state: { books },
            });
        else if (path === "favourites")
            navigate("/favourites", { state: { books } });
    }

    function navigateToBookView(book: Book): void {
        console.log("navigateToBookView", book);
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
            {books.length === 0 ? (
                <div>No {path} found</div>
            ) : (
                <>
                    <div className="overflow-hidden w-full h-60">
                        <div className="flex flex-row flex-nowrap">
                            <ul>
                                {books.map((book) => (
                                    <div
                                        key={book.isbn}
                                        className="inline-block"
                                        onClick={() => navigateToBookView(book)}
                                    >
                                        <img
                                            src={book.imageUrl}
                                            alt={`${book.title} by ${book.author}`}
                                            className="w-auto h-60 mr-10 cursor-pointer hover:scale-95 hover:transition hover:duration-200 hover:ease-in-out"
                                        />
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default BookGallery;

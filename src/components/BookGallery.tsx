import Book from "../models/Book";

const BookGallery = ({
    heading,
    books,
}: {
    heading: string;
    books: Book[];
}) => {
    function handleClick() {}
    return (
        <div>
            {books.length === 0 ? (
                <div>No books found</div>
            ) : (
                <>
                    <h1
                        className="text-xl font-bold mb-3 text-midnight-indigo cursor-pointer hover:underline hover:underline-offset-8"
                        onClick={handleClick}
                    >
                        {heading}
                    </h1>
                    <div className="overflow-hidden w-full h-60">
                        <div className="flex flex-row flex-nowrap">
                            <ul>
                                {books.map((book) => (
                                    <div
                                        key={book.isbn}
                                        className="inline-block"
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

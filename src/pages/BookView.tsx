import { useLocation, useNavigate } from "react-router-dom";
import BookShelfBanner from "../assets/BookShelfBanner.png";
import Book from "../models/Book";
import { useEffect, useRef } from "react";
import { Rating } from "@material-tailwind/react";
import { updateRatingAndPrice } from "../services/BookwormService";
import { useNavigation } from "../context/NavigationProvider";

const BookView = () => {
    const { canAccess } = useNavigation();
    const location = useLocation();
    const book = location.state?.book as Book;
    const navigate = useNavigate();
    const priceRef = useRef<HTMLInputElement>(null);
    let newRating: number;

    /**
     * If the user is allowed access, this method will set the new rating and price of the book.
     *
     */
    useEffect(() => {
        if (canAccess) {
            newRating = book.rating;
            if (priceRef && priceRef.current)
                priceRef.current.value = book.price.toString();
        }
    }, [canAccess, navigate]);

    /**
     * Navigates to the favourites page
     */
    function navigateToFavourites(): void {
        navigate("/favourites");
    }

    /**
     * Updates the rating and price of the book by calling the backend API.
     */
    function updateRatingPrice(): void {
        book.rating = newRating;
        if (priceRef && priceRef.current)
            book.price = parseInt(priceRef.current.value);
        updateRatingAndPrice(book);
    }

    return !canAccess ? (
        useEffect(() => {
            navigate("/");
        }, [])
    ) : (
        <div className="container-sm w-2/3 mx-auto py-32 h-screen">
            <div className="flex flex-col">
                <div className="h-72 w-full bg-[rgba(68, 68, 68, 1)] brightness-100 flex items-center justify-center text-center p-5">
                    <img
                        src={BookShelfBanner}
                        alt="Bookshelf Banner"
                        className="absolute bg-[rgba(68, 68, 68, 1)] brightness-50 inset-0 w-full h-full object-cover object-center z-0"
                    />
                    <p className="text-white text-5xl z-10">
                        <span className="font-semibold">{book.title}</span>
                        <span> by {book.author}</span>
                    </p>
                </div>
                <div className="w-full flex flex-col">
                    <h1 className="text-xl w-fit font-bold text-midnight-indigo cursor-pointer hover:underline hover:underline-offset-8 my-12">
                        Edit
                    </h1>
                    <form>
                        <div className="flex flex-row w-1/2">
                            <label
                                htmlFor="cost"
                                className="basis-1/3 bg-cool-mist text-white py-3 text-center"
                            >
                                Cost
                            </label>
                            <input
                                type="text"
                                ref={priceRef}
                                className="w-full border-none pl-5"
                            />
                        </div>
                        <div className="flex flex-row mt-10 w-1/2">
                            <label
                                htmlFor="rating"
                                className="basis-1/3 bg-cool-mist text-white py-3 text-center font-light"
                            >
                                Rating
                            </label>
                            <div className="bg-white w-full pl-4 content-center font-light">
                                <Rating
                                    value={book.rating}
                                    onChange={(value) => (newRating = value)}
                                />
                            </div>
                        </div>
                        <input
                            type="button"
                            value="UPDATE"
                            className="w-1/5 bg-gradient-to-b from-b1 to-b2 text-white py-3 px-4 rounded-full mt-10 font-semibold cursor-pointer"
                            onClick={updateRatingPrice}
                        />
                    </form>
                    <div className="mt-16">
                        <p>
                            <span className="text-4xl text-midnight-indigo">
                                &#10229;&nbsp;
                            </span>
                            Return to:&nbsp;
                            <span
                                className="text-cool-mist font-semibold underline underline-offset-4 decoration-0 cursor-pointer"
                                onClick={navigateToFavourites}
                            >
                                Favourties
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookView;

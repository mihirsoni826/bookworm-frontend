import Book from "../models/Book";
import BookIcon from "../assets/BookIcon.svg";
import { Rating } from "@material-tailwind/react";
import LineHeart from "../assets/LineHeart.svg";
import FilledHeart from "../assets/FilledHeart.svg";
import React from "react";
import {
    addToFavourites,
    removeFromFavourites,
} from "../services/BookwormService";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "../context/NavigationProvider";

const BookListCard = ({ book }: { book: Book }) => {
    // states
    const [currBook, setCurrBook] = React.useState(book);
    const [isFavourite, setIsFavourite] = React.useState(currBook.favourite);

    const navigate = useNavigate();
    const { setCanAccess } = useNavigation(); // context provider to set the canAccess state

    /**
     * Handles the favourite button click.
     * If the book is already favourited, removes it from the favourites list.
     * Otherwise, adds it to the favourites list.
     */
    const handleFavourite = () => {
        if (isFavourite) {
            removeFromFavourites(currBook);
        } else {
            addToFavourites(currBook);
        }
        setIsFavourite(!isFavourite);
        setCurrBook({ ...currBook, favourite: !isFavourite });
    };

    /**
     * Navigates to the book view page
     * @param book - the book to navigate to
     */
    function navigateToBookView(book: Book): void {
        setCanAccess(true); // set the canAccess state to true to allow access to the book view page
        navigate("/book/" + book.isbn, { state: { book } });
    }

    return (
        <div className="flex flex-col md:flex-row bg-white py-3 px-5">
            <div className="basis-4/6 space-x-2 md:space-x-0 flex flex-row pr-0">
                <div
                    className="content-center cursor-pointer"
                    onClick={() => navigateToBookView(currBook)}
                >
                    <img
                        src={BookIcon}
                        alt="Book icon"
                        className="mr-4 basis-0"
                    />
                </div>
                <p
                    className="grow content-center cursor-pointer"
                    onClick={() => navigateToBookView(currBook)}
                >
                    <span className="font-semibold">{currBook.title}</span> by{" "}
                    {currBook.author}
                </p>
            </div>
            <div className="flex mt-6 md:mt-0 md:flex md:flex-row basis-2/6 grow justify-between ">
                <div
                    className="md:content-center md:my-auto"
                    onClick={() => navigateToBookView(currBook)}
                >
                    <Rating
                        value={currBook.rating}
                        unratedColor="gray"
                        ratedColor="orange"
                        readonly={true}
                    />
                </div>

                <p
                    className="md:text-center md:content-center md:cursor-pointer"
                    onClick={() => navigateToBookView(currBook)}
                >
                    {currBook.price} GBP
                </p>
                <div className="content-center">
                    <img
                        src={isFavourite ? FilledHeart : LineHeart}
                        alt="Favourites heart icon"
                        className="md:cursor-pointer"
                        onClick={handleFavourite}
                    />
                </div>
            </div>
        </div>
    );
};

export default BookListCard;

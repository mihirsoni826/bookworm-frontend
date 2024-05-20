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

const BookListCard = ({
    book,
    onFavoriteStatusChange,
}: {
    book: Book;
    onFavoriteStatusChange: any;
}) => {
    const [currBook, setCurrBook] = React.useState(book);
    const [isFavourite, setIsFavourite] = React.useState(currBook.favourite);
    const navigate = useNavigate();

    const handleFavourite = () => {
        if (isFavourite) {
            removeFromFavourites(currBook);
        } else {
            addToFavourites(currBook);
        }
        setIsFavourite(!isFavourite);
        setCurrBook({ ...currBook, favourite: !isFavourite });
        onFavoriteStatusChange({ ...currBook, favourite: !isFavourite });
    };

    function navigateToBookView(book: Book): void {
        navigate("/book/" + book.isbn, { state: { book } });
    }

    return (
        <div key={currBook.isbn} className="flex flex-row bg-white py-3 px-5">
            <div
                className="content-center cursor-pointer"
                onClick={() => navigateToBookView(currBook)}
            >
                <img
                    src={BookIcon}
                    alt="Book icon"
                    className="w-6 h-6 mr-4 basis-0"
                />
            </div>
            <p
                className="basis-3/5 content-center cursor-pointer"
                onClick={() => navigateToBookView(currBook)}
            >
                <span className="font-semibold">{currBook.title}</span> by{" "}
                {currBook.author}
            </p>
            <div
                className="basis-1/5 text-right content-center my-auto"
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
                className="basis-1/5 text-center content-center cursor-pointer"
                onClick={() => navigateToBookView(currBook)}
            >
                {currBook.price} GBP
            </p>
            <div className="content-center">
                <img
                    src={isFavourite ? FilledHeart : LineHeart}
                    alt="Favourites heart icon"
                    className="w-6 h-6 mr-4 basis-0 cursor-pointer"
                    onClick={handleFavourite}
                />
            </div>
        </div>
    );
};

export default BookListCard;

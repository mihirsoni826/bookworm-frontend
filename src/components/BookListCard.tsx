import Book from "../models/Book";
import BookIcon from "../assets/BookIcon.svg";
import { Rating } from "@material-tailwind/react";
import LineHeart from "../assets/LineHeart.svg";
import FilledHeart from "../assets/FilledHeart.svg";
import React from "react";

const BookListCard = ({ book }: { book: Book }) => {
    const [isFavourite, setIsFavourite] = React.useState(false);

    const handleFavourite = () => {
        setIsFavourite(!isFavourite);
    };

    return (
        <div key={book.isbn} className="flex flex-row bg-white py-3 px-5">
            <img
                src={BookIcon}
                alt="Book icon"
                className="w-6 h-6 mr-4 basis-0"
            />
            <p className="basis-3/5">
                <span className="font-semibold">{book.title}</span> by{" "}
                {book.author}
            </p>
            <div className="basis-1/5 text-right">
                <Rating
                    value={book.rating}
                    unratedColor="gray"
                    ratedColor="orange"
                    placeholder="test"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
            </div>
            <p className="basis-1/5 text-center">{book.price} GBP</p>
            <img
                src={isFavourite ? FilledHeart : LineHeart}
                alt="Favourites heart icon"
                className="w-6 h-6 mr-4 basis-0 cursor-pointer"
                onClick={handleFavourite}
            />
        </div>
    );
};

export default BookListCard;

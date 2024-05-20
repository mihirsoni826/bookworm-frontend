import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.jpeg";
import Settings from "../assets/Settings.svg";
import Stats from "../assets/Stats.svg";
import LineHeart from "../assets/LineHeart.svg";

export default function Sidebar() {
    const navigate = useNavigate();

    // Define active paths for each icon
    const isActiveStats = ["/bestsellers", "/", "/home"].includes(
        location.pathname
    );
    const isActiveFavourites =
        ["/favourites", "/book"].includes(location.pathname) ||
        location.pathname.startsWith("/book");

    return (
        <div className="h-16 flex flex-row inset-x-0 top-0 bg-midnight-indigo text-white items-center inset-y-0 left-0 fixed z-10 md:w-16 md:flex md:flex-col md:h-screen">
            <div className="p-3 h-16 basis-1/7 content-center md:flex bg-cool-mist md:w-full md:items-center md:justify-center md:pb-3">
                <img
                    src={avatar}
                    alt="Profile"
                    className="rounded-full w-9 h-9"
                />
            </div>
            <div className="flex flex-row grow justify-end md:w-full md:flex md:flex-col md:flex-1 md:items-center md:justify-center md:bg-midnight-indigo md:pb-20">
                <div
                    className={`px-5 h-18 cursor-pointer md:w-full md:flex md:flex-col md:items-center md:justify-center md:hover:w-20 md:hover:bg-gradient-to-b md:from-b1 md:to-b2 md:hover:rounded-r-lg md:hover:shadow-[0px_5px_15px_0px_rgba(61, 76, 108, 1)] ${
                        isActiveStats
                            ? "bg-gradient-to-b from-b1 to-b2 md:w-20 rounded-b-lg md:rounded-r-lg md:shadow-[0px_5px_15px_0px_rgba(61,76,108,1)]"
                            : ""
                    }`}
                    onClick={() => navigate("/")}
                >
                    <div className="pt-6 pb-2">
                        <img
                            src={Stats}
                            alt="Statistics icon"
                            className="h-6 w-6"
                        />
                    </div>
                    <div className="hidden md:w-1/4 md:border-b md:pt-4" />
                </div>
                <hr />
                <div
                    className={`px-5 h-18 cursor-pointer md:w-full md:flex md:flex-col md:items-center md:justify-center md:hover:w-20 md:hover:bg-gradient-to-b md:from-b1 md:to-b2 md:hover:rounded-r-lg md:hover:shadow-[0px_5px_15px_0px_rgba(61, 76, 108, 1)] ${
                        isActiveFavourites
                            ? "bg-gradient-to-b from-b1 to-b2 rounded-b-lg md:w-20 md:rounded-r-lg md:shadow-[0px_5px_15px_0px_rgba(61,76,108,1)]"
                            : ""
                    }`}
                    onClick={() => navigate("/favourites")}
                >
                    <div className="pt-6 pb-2">
                        <img
                            src={LineHeart}
                            alt="Favourites heart icon"
                            className="h-6 w-6"
                        />
                    </div>
                    <div className="hidden md:w-1/4 md:border-b md:pt-4" />
                </div>
                <div
                    className="px-5 h-18 cursor-pointer md:w-full md:flex md:flex-col md:items-center md:justify-center md:hover:w-20 md:hover:bg-gradient-to-b md:from-b1 md:to-b2 md:hover:rounded-r-lg md:hover:shadow-[0px_5px_15px_0px_rgba(61, 76, 108, 1)]"
                    onClick={() => navigate("/")}
                >
                    <div className="pt-6 pb-2">
                        <img
                            src={Settings}
                            alt="Settings icon"
                            className="h-6 w-6"
                        />
                    </div>
                    <div className="w-1/4 border-b pt-4" />
                </div>
            </div>
        </div>
    );
}

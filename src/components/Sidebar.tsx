import avatar from "../assets/avatar.jpeg";
import Settings from "../assets/Settings.svg";
import Stats from "../assets/Stats.svg";
import Vector from "../assets/Vector.svg";

export default function Sidebar() {
    return (
        <div className="h-screen w-16 bg-midnight-indigo text-white flex flex-col items-center"> 
            <div className="flex bg-cool-mist w-full items-center justify-center p-3 pb-4">
                <img
                    src={avatar}
                    alt="Profile"
                    className="rounded-full w-9 h-9"
                />
            </div>
            <div className="w-full flex flex-col flex-1 items-center justify-center bg-midnight-indigo pb-20">
                <div className="cursor-pointer w-full flex flex-col items-center justify-center hover:bg-gradient-to-b from-b1 to-b2 hover:rounded-r-lg hover:shadow-[0px_5px_15px_0px_rgba(61, 76, 108, 1)]">
                    <a href="#" className="pt-6 pb-2">
                        <img
                            src={Stats}
                            alt="Statistics icon"
                            className="h-6 w-6"
                        />
                    </a>
                    <div className="w-1/4 border-b pt-4" />
                </div>
                <hr />
                <div className="cursor-pointer w-full flex flex-col items-center justify-center hover:bg-gradient-to-b from-b1 to-b2 hover:w-22 hover:rounded-r-lg hover:shadow-[0px_5px_15px_0px_rgba(61, 76, 108, 1)]">
                    <a href="#" className="pt-6 pb-2">
                        <img
                            src={Vector}
                            alt="Favourites heart icon"
                            className="h-6 w-6"
                        />
                    </a>
                    <div className="w-1/4 border-b pt-4" />
                </div>
                <div className="cursor-pointer w-full flex flex-col items-center justify-center hover:bg-gradient-to-b from-b1 to-b2 hover:w-22 hover:rounded-r-lg hover:shadow-[0px_5px_15px_0px_rgba(61, 76, 108, 1)]">
                    <a href="#" className="pt-6 pb-2">
                        <img
                            src={Settings}
                            alt="Settings icon"
                            className="h-6 w-6"
                        />
                    </a>
                    <div className="w-1/4 border-b pt-4" />
                </div>
            </div>
        </div>
    );
}

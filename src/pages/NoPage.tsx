import { useNavigate } from "react-router-dom";

const NoPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen px-10 text-midnight-indigo text-center">
            <h1 className="text-3xl font-bold mb-2">
                Oops! You're at the wrong place
            </h1>
            <h2 className="text-xl font-regular">
                This page is out chasing rainbows 🏃‍♂️‍➡️🌈
            </h2>
            <div className="mt-10">
                <span className="text-4xl text-midnight-indigo">
                    &#10229;&nbsp;
                </span>
                Return to{" "}
                <span
                    className="font-semibold cursor-pointer underline underline-offset-4 decoration-0 text-cool-mist"
                    onClick={() => navigate("/")}
                >
                    Home
                </span>
            </div>
        </div>
    );
};

export default NoPage;

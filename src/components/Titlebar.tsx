import { useNavigate } from "react-router-dom";

export default function Titlebar() {
    const navigate = useNavigate();

    /**
     * Navigate to the home page when the logo is clicked
     */
    function navigateToHome(): void {
        navigate("/");
    }

    return (
        <div className="bg-white my-auto py-4 px-6 items-center fixed inset-x-0 top-0 left-16 z-10">
            <div className="w-fit cursor-pointer" onClick={navigateToHome}>
                <span className="text-lg font-bold">RAD</span>
                <span className="text-lg font-bold text-[#8b211d]">ICAL</span>
            </div>
        </div>
    );
}

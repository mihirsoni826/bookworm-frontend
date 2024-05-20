import { useRef } from "react";
import Magnify from "../assets/magnify.svg";
export default function Search({
    placeholder,
    onSearch,
}: {
    placeholder: string;
    onSearch: (key: string | undefined) => void;
}) {
    const searchRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <div className="relative mt-2 rounded-md shadow-sm flex flex-row">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="pl-1">
                        <img src={Magnify} alt="" />
                    </span>
                </div>
                <input
                    type="text"
                    name="price"
                    id="price"
                    className="block w-full rounded-l-full border-none py-3 pl-12 text-sm"
                    ref={searchRef}
                    placeholder={placeholder}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onSearch(searchRef.current?.value);
                        }
                    }}
                />
                <input
                    type="button"
                    value="GO"
                    className="bg-cool-mist rounded-r-full px-5 text-white cursor-pointer"
                    onClick={() => {
                        onSearch(searchRef.current?.value);
                    }}
                />
            </div>
        </div>
    );
}

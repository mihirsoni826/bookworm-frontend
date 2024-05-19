import Magnify from "../assets/magnify.svg";
export default function Search({ placeholder }: { placeholder: string }) {
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
                    className="block w-full rounded-l-full border-none py-3 pl-12 pr-20 text-sm"
                    placeholder={placeholder}
                />
                <input
                    type="button"
                    value="GO"
                    className="bg-cool-mist rounded-r-full px-5 text-white"
                />
            </div>
        </div>
    );
}

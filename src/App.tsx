import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NYTBestsellers from "./pages/NYTBestsellers";
import Sidebar from "./components/Sidebar";
import Titlebar from "./components/Titlebar";

const App = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-icy-whisper font-sans">
                <Titlebar />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route
                            path="/bestsellers"
                            element={<NYTBestsellers />}
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
};

export default App;

/*
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NYTBestsellers from "./pages/NYTBestsellers";

const App = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-icy-whisper font-sans">
                <Titlebar />
                <div className="container-sm w-3/4 mx-auto pt-20">
                    <Search placeholder="What books would you like to find?" />
                    <div className="pt-20" />
                    <BookGallery
                        heading="New York Times Bestsellers"
                        books={bestsellers}
                    />
                    <div className="pt-14" />
                    <BookGallery heading="Favourites" books={favourites} />
                </div>
            </div>
        </div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/bestsellers" element={<NYTBestsellers />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;


*/

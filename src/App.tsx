import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NYTBestsellers from "./pages/NYTBestsellers";
import Sidebar from "./components/Sidebar";
import Titlebar from "./components/Titlebar";
import Favourites from "./pages/Favourites";
import BookView from "./pages/BookView";
import { NavigationProvider } from "./context/NavigationProvider";

const App = () => {
    return (
        <NavigationProvider>
            <BrowserRouter>
                <div className="flex">
                    <Sidebar />
                    <div className="flex-1 bg-icy-whisper font-sans overflow-y-auto h-screen">
                        <Titlebar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route
                                path="/bestsellers"
                                element={<NYTBestsellers />}
                            />
                            <Route
                                path="/favourites"
                                element={<Favourites />}
                            />
                            <Route path="/book/:isbn" element={<BookView />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </NavigationProvider>
    );
};

export default App;

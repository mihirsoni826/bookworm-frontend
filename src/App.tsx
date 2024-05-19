import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NYTBestsellers from "./pages/NYTBestsellers";
import Sidebar from "./components/Sidebar";
import Titlebar from "./components/Titlebar";

const App = () => {
    return (
        <BrowserRouter>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 bg-icy-whisper font-sans overflow-y-auto">
                    <Titlebar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route
                            path="/bestsellers"
                            element={<NYTBestsellers />}
                        />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;

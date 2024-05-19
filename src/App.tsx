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
            <div className="flex-1 bg-icy-whisper font-sans overflow-y-auto">
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

import "./App.css";
import Sidebar from "./components/Sidebar";
import Titlebar from "./components/Titlebar";

function App() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Titlebar />
            </div>
        </div>
    );
}

export default App;

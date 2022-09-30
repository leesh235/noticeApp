import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./utils/route";
import Home from "./pages/home/Home";
import { SideBar } from "./components/sidebar/SideBar";

export default function App() {
    return (
        <Router>
            <SideBar />
            <Routes>
                <Route path={routes.home} element={<Home />} />
                <Route path={routes.memo} element={<Home />} />
            </Routes>
        </Router>
    );
}

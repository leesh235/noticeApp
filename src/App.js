import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./utils/route";
import Home from "./pages/home/Home";
import { SideBar } from "./components/sidebar/SideBar";

export default function App() {
    return (
        <>
            <SideBar />
            <Router>
                <Routes>
                    <Route path={routes.home} element={<Home />} />
                </Routes>
            </Router>
        </>
    );
}

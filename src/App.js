import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./route";
import Home from "./pages/home/Home";

export default function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path={routes.home} element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

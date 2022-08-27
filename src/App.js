import "./App.css";
import { useState, useEffect } from "react";

function App() {
    const [dataList, setDataList] = useState([1, 2, 3]);
    const [dnd, setDnd] = useState({
        draggedFrom: null,
        draggedTo: null,
        isDragging: false,
        originalOrder: [],
        updatedOrder: [],
    });

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragStart = (e) => {};

    const handleDragEnd = (e) => {};

    const handleDrop = (e) => {};

    const handleDragLeave = (e) => {};

    const handleDragEnter = (e) => {};

    useEffect(() => {}, []);

    return (
        <div className="app">
            <ul className="list" onDragOver={handleDragOver}>
                {dataList.map((val, idx) => {
                    return (
                        <li
                            className="draggable item"
                            key={idx}
                            data-position={idx}
                            draggable="true"
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onDragEnter={handleDragEnter}
                            onDragEnd={handleDragEnd}
                        >
                            {val}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default App;

import "./Drag1.css";
import { useState, useEffect } from "react";

export const Drag1 = () => {
    const [dataList, setDataList] = useState([1, 2, 3]);
    const [dnd, setDnd] = useState({
        draggedFrom: null, //시작 인덱스
        draggedTo: null, //변경될 인덱스
        isDragging: false,
        originalOrder: [], //data list
        updatedOrder: [], //update data list
    });

    const handleDragOver = (e) => {
        e.preventDefault();
        const reminingList = dnd.originalOrder.filter((val, idx) => {
            return idx !== dnd.draggedFrom;
        });
        let updateList = [
            ...reminingList.slice(0, dnd.draggedTo),
            dnd.originalOrder[dnd.draggedFrom],
            ...reminingList.slice(dnd.draggedTo),
        ];
        setDnd({ ...dnd, updatedOrder: updateList });
    };

    //드래그할 item index
    const handleDragStart = (e) => {
        setDnd({
            ...dnd,
            draggedFrom: Number(e.target.dataset.index),
            originalOrder: dataList,
        });
    };

    //겹쳐진 item index
    const handleDragEnter = (e) => {
        // e.target.classList.add("over");
        setDnd({ ...dnd, draggedTo: Number(e.target.dataset.index) });
    };

    const handleDrop = (e) => {
        setDataList(dnd.updatedOrder);
        setDnd({
            ...dnd,
            draggedFrom: null,
            draggedTo: null,
        });
    };

    const handleDragLeave = (e) => {
        // e.target.classList.remve("over");
        setDnd({ ...dnd, draggedTo: null });
    };

    const handleDragEnd = (e) => {};

    useEffect(() => {}, []);

    return (
        <ul className="list">
            {dataList.map((val, idx) => {
                return (
                    <li
                        key={idx}
                        data-index={idx}
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
    );
};

import "./Drag2.css";
import { useState, useEffect } from "react";
import { useDnd } from "../../hooks/useDnd";

export const Drag2 = () => {
    const [dataList, setDataList] = useState({
        todos: [1, 2, 3, 4, 5, 6],
        progress: [7, 8, 9, 10, 11, 12],
        complete: [13, 14, 15, 16, 17, 18],
    });

    const { updateList, attribute } = useDnd({
        initList: { ...dataList },
    });

    useEffect(() => {
        setDataList(updateList);
    }, [updateList]);

    return (
        <>
            <ul id="todos" className="list">
                {dataList.todos?.map((val, idx) => {
                    return (
                        <li id={idx} key={idx} {...attribute}>
                            {val}
                        </li>
                    );
                })}
            </ul>
            <ul id="progress" className="list">
                {dataList.progress?.map((val, idx) => {
                    return (
                        <li id={idx} key={idx} {...attribute}>
                            {val}
                        </li>
                    );
                })}
            </ul>
            <ul id="complete" className="list">
                {dataList.complete?.map((val, idx) => {
                    return (
                        <li id={idx} key={idx} {...attribute}>
                            {val}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

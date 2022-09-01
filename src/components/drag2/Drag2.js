import "./Drag2.css";
import { useState, useEffect } from "react";
import { useDnd } from "../../hooks/useDnd";

export const Drag2 = () => {
    const [dataList, setDataList] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const { updateList, attribute } = useDnd({
        initList: [1, 2, 3, 4, 5, 6, 7, 8],
    });

    useEffect(() => {
        setDataList(updateList);
    }, [updateList]);

    return (
        <ul className="list">
            {dataList.map((val, idx) => {
                return (
                    <li id={idx} key={idx} {...attribute}>
                        {val}
                    </li>
                );
            })}
        </ul>
    );
};

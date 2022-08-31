import "./Drag2.css";
import { useRef, useState, useEffect } from "react";

/**
 *  drag and drop
 *
 * -흐름
 * 드래그할 아이템과 드랍될 곳의 아이템을 찾는다.
 * 두 아이템을 이용해 순서가 바뀐 새로운 list를 만든다.
 *
 * -드래그할 아이템
 *      dragable속성 값을 준다.
 *      dragstart event를 부여한다.(현재 드래그하고 있는 아이템의 특정 정보를 저장한다. dataTransfer.setData("name",value))
 *
 * -드랍될 곳
 *      dragpover event를 부여한다.(드랍이 가능한 상태로 변경/preventDefault를 해줘야함)
 *      drop event를 부여한다.(dataTransfer에 저장된 정보를 통해 리스트 상태를 업데이트 해준다. dataTransfer.getData("name"))
 *
 * -dataTransfer
 * dnd 작업 중에 드래그되는 데이터를 유지하는데 사용
 */
export const Drag2 = () => {
    const [dataList, setDataList] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

    const dragItem = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        console.log(e.dataTransfer.getData("dragItem"));
    };

    const handleDragStart = (e) => {
        dragItem.current = Number(e.target.id);
        e.dataTransfer.effectAllowed = "move";
        // e.dataTransfer.setData("dragItem", e.target.id);
        e.target.classList.add("grabbing");
    };

    const handleDrop = (e) => {
        const dragedItem = dragItem.current;
        const targetItem = Number(e.target.id);

        const filterList = dataList.filter((val, idx) => idx !== dragedItem);

        const newList = [
            ...filterList.slice(0, targetItem),
            dataList[dragedItem],
            ...filterList.slice(targetItem),
        ];

        setDataList(newList);
    };

    const handleDragEnd = (e) => {
        e.target.dataTransfer.dropEffect = "move";
        e.target.classList.remove("grabbing");
        dragItem.current = null;
    };

    const handleDragEnter = (e) => {
        console.log(e.target.id);
        if (Number(e.target.id) > dragItem.current)
            e.target.classList.add("move_up");
        else if (Number(e.target.id) < dragItem.current)
            e.target.classList.add("move_down");
    };

    const handleDragLeave = (e) => {
        e.target.classList.remove("move_up");
        e.target.classList.remove("move_down");
    };

    useEffect(() => {}, []);

    return (
        <ul className="list">
            {dataList.map((val, idx) => {
                return (
                    <li
                        id={idx}
                        className="draggable item"
                        key={idx}
                        draggable="true"
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onDragEnd={handleDragEnd}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                    >
                        {val}
                    </li>
                );
            })}
        </ul>
    );
};

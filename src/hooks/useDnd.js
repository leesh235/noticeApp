import { useState, useRef, useEffect } from "react";

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
export const useDnd = ({ initList = [] }) => {
    const draggable = true;
    const [updateList, setUpdateList] = useState(initList);

    const dndItem = useRef({
        dragItem: null,
        targetItem: null,
        updateList: [],
    });

    //드래그가 시작될 때
    const onDragStart = (e) => {
        dndItem.current.dragItem = Number(e.target.id);
        e.target.classList.add("grabbing");
    };

    //드래그가 끝날 때
    const onDragEnd = (e) => {
        if (dndItem.current.updateList.length === 0) return;
        setUpdateList(dndItem.current.updateList);

        dndItem.current.dragItem = null;
        dndItem.current.targetItem = null;
        dndItem.current.updateList = [];

        e.target.classList.remove("grabbing");
    };

    //드랍될 영역위에 위치하고 있을 때(ms)
    const onDragOver = (e) => {
        e.preventDefault();
    };

    //해당 위치에 드랍될 때
    const onDrop = (e) => {};

    //드랍될 영역에 들어왔을 때
    const onDragEnter = (e) => {
        if (dndItem.current.dragItem === Number(e.target.id)) return;
        dndItem.current.targetItem = Number(e.target.id);

        const dragItem = dndItem.current.dragItem;
        const targetItem = Number(e.target.id);

        const filterList = updateList.filter((val, idx) => idx !== dragItem);

        const newList = [
            ...filterList.slice(0, targetItem),
            updateList[dragItem],
            ...filterList.slice(targetItem),
        ];

        dndItem.current.updateList = newList;
    };

    //드랍될 영역을 벗어났을 때
    const onDragLeave = (e) => {};

    useEffect(() => {}, []);

    return {
        updateList,
        attribute: {
            className: "item",
            draggable,
            onDragStart,
            onDragOver,
            onDrop,
            onDragEnd,
            onDragEnter,
            onDragLeave,
        },
    };
};

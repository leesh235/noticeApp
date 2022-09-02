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
export const useDnd = ({
    initList = { todos: [], progress: [], completed: [] },
}) => {
    const draggable = true;
    const [updateList, setUpdateList] = useState(initList);

    const dndItem = useRef({
        dragItem: null,
        targetItem: null,
        updateList: { todos: [], progress: [], completed: [] },
    });

    const dndParent = useRef({
        dragParent: null,
        targetParent: null,
    });

    //드래그가 시작될 때
    const onDragStart = (e) => {
        dndItem.current.dragItem = Number(e.target.id);
        dndParent.current.dragParent = e.target.parentElement;
        e.target.classList.add("grabbing");
    };

    //드래그가 끝날 때
    const onDragEnd = (e) => {
        if (dndItem.current.updateList[e.target.parentElement.id].length === 0)
            return;
        setUpdateList(dndItem.current.updateList);

        dndItem.current.dragItem = null;
        dndItem.current.targetItem = null;
        dndItem.current.updateList = { todos: [], progress: [], completed: [] };
        dndParent.current.dragParent = null;

        e.target.classList.remove("grabbing");
    };

    //드랍될 영역위에 위치하고 있을 때(ms)
    const onDragOver = (e) => {
        e.preventDefault();
    };

    //해당 위치에 드랍될 때
    const onDrop = (e) => {
        console.log(e.target);
    };

    //드랍될 영역에 들어왔을 때
    const onDragEnter = (e) => {
        if (
            e.target.parentElement === dndParent.current.dragParent &&
            dndItem.current.dragItem === Number(e.target.id)
        )
            return;

        const diffParent = e.target.parentElement;
        const myParent = dndParent.current.dragParent;
        const dragItem = dndItem.current.dragItem;
        const targetItem = Number(e.target.id);
        let newList = { todos: [], progress: [], completed: [] };

        const filterList = updateList[myParent.id].filter(
            (val, idx) => idx !== dragItem
        );

        if (diffParent === myParent) {
            dndItem.current.targetItem = Number(e.target.id);
            newList = {
                ...updateList,
                [myParent.id]: [
                    ...filterList.slice(0, targetItem),
                    updateList[myParent.id][dragItem],
                    ...filterList.slice(targetItem),
                ],
            };
        } else {
            const difffilterList = updateList[diffParent.id].filter(
                (val, idx) => idx !== targetItem
            );

            newList = {
                ...updateList,
                [myParent.id]: [
                    ...filterList.slice(0, dragItem),
                    updateList[diffParent.id][targetItem],
                    ...filterList.slice(dragItem),
                ],
                [diffParent.id]: [
                    ...difffilterList.slice(0, targetItem),
                    updateList[myParent.id][dragItem],
                    ...difffilterList.slice(targetItem),
                ],
            };
        }
        dndItem.current.updateList = newList;
    };

    //드랍될 영역을 벗어났을 때
    const onDragLeave = (e) => {
        //드래그로 영역에 들어갔다 빈공간에 drop했을때 updatelist가 반영되는거 방지
        //문제: 아이템의 margin이 0일때 drag item enter -> target item enter -> drag item leave 순으로 발생하여 updatelist가 반영되지않음
        dndItem.current.updateList = updateList;
    };

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

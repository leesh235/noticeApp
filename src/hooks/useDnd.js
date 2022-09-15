import { useState, useRef, useEffect } from "react";

/**
 *  drag and drop
 *
 * -흐름
 * 드래그할 아이템과 드랍될 곳의 아이템을 찾는다.
 * 두 아이템이 같은 리스트에 포함되는지 확인한다.
 * 두 아이템을 이용해 순서가 바뀐 새로운 list를 만든다.
 * 같은 리스트의 경우
 *      -drag item을 제외한 새로운 리스트를 만든다.
 *      -드랍되는 곳의 아이템 기준으로 두개의 리스트로 나눈다.
 *      -두 리스트 사이에 drag item을 넣어 순서가 변경된 리스트를 만든다.
 * 다른 리스트의 경우
 *      -drag item이 속한 리스트와 drop item이 속한 리스트를 각각의 아이템이 제외된 리스트를 만든다.
 *      -drag item이 속했던 리스트는 drag item을 기준으로 두개의 리스트로 나누고 그 사이에 drop item을 넣어 새로운 리스트를 만든다.
 *      -drop item이 속했던 리스트는 drop item을 기준으로 두개의 리스트로 나누고 그 사이에 drag item을 넣어 새로운 리스트를 만든다.
 *
 * -드래그할 아이템
 *      dragable속성 값을 준다.
 *      dragstart event (drag item의 정보와 속한 리스트의 정보를 저장, css추가)
 *      dragend event (모든 event가 종료됐으므로 저장된 정보들을 초기화, css제거)
 *
 * -드랍될 곳
 *      dragpover event (드랍이 가능한 상태로 변경/preventDefault를 해줘야함)
 *      dragenter event (저장된 drag item과 drop item을 이용해 변경된 리스트 생성)
 *      dragleave event (변경된 리스트가 영역 밖에서 드랍됐을때 적용되는 문제 방지)
 *      drop event (변경된 리스트를 dom에 적용)
 */
export const useDnd = ({
    initList = { todos: [], progress: [], completed: [] },
}) => {
    const draggable = true; //draggable에 true 속성주기
    const [updateList, setUpdateList] = useState(initList);

    const dndItem = useRef({
        dragItem: null, //drag한 아이템
        targetItem: null, //drop할 위치의 아이템
        dragParent: null, //drag한 아이템의 부모
        targetParent: null, //drop할 위치의 아이템의 부모
        updateList: { todos: [], progress: [], completed: [] }, //순서 변경 data
    });

    //드래그가 시작될 때
    const onDragStart = (e) => {
        dndItem.current.dragItem = e.currentTarget;
        dndItem.current.dragParent = e.currentTarget.parentElement;
        e.currentTarget.classList.add("grabbing");
    };

    //드래그가 끝날 때
    const onDragEnd = (e) => {
        dndItem.current.dragItem = null;
        dndItem.current.targetItem = null;
        dndItem.current.updateList = { todos: [], progress: [], completed: [] };

        e.target.classList.remove("grabbing");
    };

    //드랍될 영역위에 위치하고 있을 때(ms)
    const onDragOver = (e) => {
        e.preventDefault();
    };

    //해당 위치에 드랍될 때
    const onDrop = (e) => {
        if (
            dndItem.current.updateList[e.currentTarget.parentElement.id]
                .length === 0
        )
            return;
        setUpdateList(dndItem.current.updateList);
    };

    //드랍될 영역에 들어왔을 때
    const onDragEnter = (e) => {
        //drag item과 drop할 위치가 같으면 return
        if (dndItem.current.dragItem === e.currentTarget) return;

        const dragParent = dndItem.current.dragParent;
        const targetParent = e.currentTarget.parentElement;
        const dragItem = Number(dndItem.current.dragItem.id);
        const targetItem = Number(e.currentTarget.id);
        let newList = { todos: [], progress: [], completed: [] };

        //drag item을 제외한 리스트
        const filterList = updateList[dragParent.id].filter(
            (val, idx) => idx !== dragItem
        );

        //drag item과 drop 위치가 같은 list일 때
        if (targetParent === dragParent) {
            newList = {
                ...updateList,
                [dragParent.id]: [
                    ...filterList.slice(0, targetItem),
                    updateList[dragParent.id][dragItem],
                    ...filterList.slice(targetItem),
                ],
            };
        }
        //drag item과 drop 위치가 다른 list일 때
        else {
            //drop할 위치를 제외한 리스트
            const difffilterList = updateList[targetParent.id].filter(
                (val, idx) => idx !== targetItem
            );

            newList = {
                ...updateList,
                [dragParent.id]: [
                    ...filterList.slice(0, dragItem),
                    updateList[targetParent.id][targetItem],
                    ...filterList.slice(dragItem),
                ],
                [targetParent.id]: [
                    ...difffilterList.slice(0, targetItem),
                    updateList[dragParent.id][dragItem],
                    ...difffilterList.slice(targetItem),
                ],
            };
        }
        dndItem.current.updateList = newList;
    };

    //드랍될 영역을 벗어났을 때
    const onDragLeave = (e) => {
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

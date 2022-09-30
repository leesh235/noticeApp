import "./Dnd.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getListAction } from "../../../modules/action/list";

export const Dnd = ({ data, addList, openModal }) => {
    const [list, setList] = useState({});

    const dndRef = useRef({
        dragItem: null,
        dragParent: null,
        updataList: data,
    });

    //드랍이 가능해짐
    const onDragOver = (e) => {
        e.preventDefault();
    };

    //드래그를 시작했을 때
    const onDragStart = (e) => {
        //드래그한 아이템 저장
        dndRef.current.dragItem = e.currentTarget;
        dndRef.current.dragParent = e.currentTarget.parentElement;
    };

    //드래그 아이템이 타켓 아이템 영역에 들어왔을 때
    const onDragEnter = (e) => {
        //드래그 아이템과 타겟 아이템이 같을 때 리턴
        if (e.currentTarget === dndRef.current.dragItem) return;

        let dragIndex;
        let targetIndex;
        let newList = {};

        //같은 리스트에 포함되는지 확인
        //같은 리스트일 때
        if (dndRef.current.dragParent === e.currentTarget.parentElement) {
            e.currentTarget.parentElement?.childNodes.forEach((node, idx) => {
                if (node === e.currentTarget) targetIndex = idx;
                if (node === dndRef.current.dragItem) dragIndex = idx;
            });
            const nonDragList = list[dndRef.current.dragParent.id].filter(
                (val, idx) => idx !== dragIndex
            );
            newList = {
                ...list,
                [dndRef.current.dragParent.id]: [
                    ...nonDragList.slice(0, targetIndex),
                    list[dndRef.current.dragParent.id][dragIndex],
                    ...nonDragList.slice(targetIndex),
                ],
            };
        }
        //서로 다른 리스트 일때
        else {
            dndRef.current.dragParent?.childNodes.forEach((node, idx) => {
                if (node === dndRef.current.dragItem) dragIndex = idx;
            });
            e.currentTarget.parentElement?.childNodes.forEach((node, idx) => {
                if (node === e.currentTarget) targetIndex = idx;
            });
            const nonDragList = list[dndRef.current.dragParent.id].filter(
                (val, idx) => idx !== dragIndex
            );
            newList = {
                ...list,
                [dndRef.current.dragParent.id]: [...nonDragList],
                [e.currentTarget.parentElement.id]: [
                    ...list[e.currentTarget.parentElement.id].slice(
                        0,
                        targetIndex
                    ),
                    list[dndRef.current.dragParent.id][dragIndex],
                    ...list[e.currentTarget.parentElement.id].slice(
                        targetIndex
                    ),
                ],
            };
        }

        dndRef.current.updataList = newList;
    };

    //드래그 아이템이 타켓 아이템 영역을 벗어났을 때
    const onDragLeave = (e) => {
        //드래그를 취소했을 때 dragenter로 인해 변경된 리스트를 이전으로 바꿔줌
        //드래그 취소시 변경된 리스트가 반영됨(드랍을 하지 않으면 변경된 리스트가 반영되면 안됨)
        dndRef.current.updataList = list;
    };

    //드래그 아이템을 타겟 아이템위에 드랍했을 때
    const onDrop = (e) => {
        //아이템 드랍시 list 변경
        setList(dndRef.current.updataList);
    };

    //드래그가 끝났을 때
    const onDragEnd = (e) => {
        //저장한 드래그 아이템 초기화
        dndRef.current.dragItem = null;
        dndRef.current.dragParent = null;
    };

    useEffect(() => {
        setList(data);
    }, [data]);

    return (
        <main>
            {Object.keys(list)?.map((val, idx) => {
                return (
                    <section key={idx} className="list">
                        <div className="title">
                            <div>{val}</div>
                            <div
                                onClick={() => {
                                    addList(val);
                                }}
                            >
                                +
                            </div>
                        </div>
                        <ul id={val}>
                            {list[val]?.map((item) => {
                                return (
                                    <li
                                        draggable
                                        key={item.id}
                                        className="item"
                                        onDragOver={onDragOver}
                                        onDragStart={onDragStart}
                                        onDrop={onDrop}
                                        onDragEnd={onDragEnd}
                                        onDragEnter={onDragEnter}
                                        onDragLeave={onDragLeave}
                                        onClick={() => {
                                            openModal(item.id);
                                        }}
                                    >
                                        {item.title}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                );
            })}
        </main>
    );
};

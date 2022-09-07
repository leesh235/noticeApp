import "./Home.css";
import { useState, useEffect } from "react";
import { useDnd } from "../../hooks/useDnd";
import { Detail } from "../../components/Detail/Detail";
import { Add } from "../../components/add/Add";

const lists = ["todos", "progress", "complete"];
const titles = ["할일", "진행중", "완료"];

export default function Home() {
    const [dataList, setDataList] = useState({
        todos: [1, 2, 3, 4, 5, 6],
        progress: [7, 8, 9, 10, 11, 12],
        complete: [13, 14, 15, 16, 17, 18],
    });
    const [pageModal, setPageModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [id, setId] = useState(null);

    const { updateList, attribute } = useDnd({
        initList: { ...dataList },
    });

    const _addList = (e) => {
        setAddModal(true);
        console.log(e.currentTarget);
        console.log(e.currentTarget.parentElement.parentElement);
    };

    const _openPage = (e) => {
        setPageModal(true);
        setId(Number(e.currentTarget.parentElement.dataset.value));
    };

    useEffect(() => {
        setDataList(updateList);
    }, [updateList]);

    return (
        <>
            <main>
                {lists.map((val, idx) => {
                    return (
                        <ul key={idx} id={val} className="list">
                            <div className="title">
                                <div>{titles[idx]}</div>
                                <div onClick={_addList}>+</div>
                            </div>
                            {dataList[val]?.map((val, idx) => {
                                return (
                                    <li
                                        id={idx}
                                        key={idx}
                                        {...attribute}
                                        data-value={val}
                                    >
                                        <div></div>
                                        <div data-id={idx} onClick={_openPage}>
                                            {val}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    );
                })}
            </main>
            {pageModal && (
                <Detail
                    id={id}
                    closeFunc={() => {
                        setPageModal(false);
                    }}
                />
            )}
            {addModal && (
                <Add
                    closeFunc={() => {
                        setAddModal(false);
                    }}
                />
            )}
        </>
    );
}

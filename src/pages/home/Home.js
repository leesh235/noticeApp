import "./Home.css";
import { useState, useEffect } from "react";
import { useDnd } from "../../hooks/useDnd";
import { Detail } from "../../components/detail/Detail";
import { useSelector, useDispatch } from "react-redux";
import { getListAction, addListAction } from "../../modules/action/list";

const lists = ["todos", "progress", "complete"];
const titles = ["할일", "진행중", "완료"];

export default function Home() {
    const dispatch = useDispatch();
    const dataList = useSelector((state) => state.list);

    const [pageModal, setPageModal] = useState(false);
    const [info, setInfo] = useState({ id: null, parent: "" });

    const { updateList, attribute } = useDnd({
        initList: { ...dataList },
    });

    const _openPage = (e, mode, parent) => {
        if (mode === "add") {
            dispatch(
                addListAction({
                    parent,
                    post: {
                        id:
                            dataList[parent][dataList[parent].length - 1].id +
                            1,
                        title: `제목없음`,
                        writer: `user1`,
                        createAt: `YYYY-MM-DD`,
                        modifyAt: ``,
                    },
                })
            );
            setInfo({
                id: dataList[parent][dataList[parent].length - 1].id + 1,
                parent,
            });
        } else {
            setInfo({
                id: Number(e.currentTarget.id),
                parent,
            });
        }
        setPageModal(true);
    };

    useEffect(() => {
        dispatch(getListAction(updateList));
    }, [updateList]);

    return (
        <>
            <main>
                {lists?.map((parent, idx) => {
                    return (
                        <ul key={idx} id={parent} className="list">
                            <div className="title">
                                <div>{titles[idx]}</div>
                                <div
                                    onClick={(e) => {
                                        _openPage(e, "add", parent);
                                    }}
                                >
                                    +
                                </div>
                            </div>
                            {dataList[parent]?.map((val) => {
                                return (
                                    <li
                                        id={val.id}
                                        key={val.id}
                                        {...attribute}
                                        data-value={val.id}
                                        onClick={(e) => {
                                            _openPage(e, "open", parent);
                                        }}
                                    >
                                        {val.title}
                                    </li>
                                );
                            })}
                        </ul>
                    );
                })}
            </main>
            {pageModal && (
                <Detail
                    id={info.id}
                    parent={info.parent}
                    closeFunc={() => {
                        setPageModal(false);
                    }}
                />
            )}
        </>
    );
}

import "./Home.css";
import { useState, useEffect } from "react";
import { useDnd } from "../../hooks/useDnd";
import { Detail } from "../../components/detail/Detail";
import { useSelector, useDispatch } from "react-redux";
import { getListAction } from "../../modules/action/list";

const lists = ["todos", "progress", "complete"];
const titles = ["할일", "진행중", "완료"];

export default function Home() {
    const dispatch = useDispatch();
    const dataList = useSelector((state) => state.list);

    const [pageModal, setPageModal] = useState(false);
    const [parent, setParent] = useState("");
    const [id, setId] = useState(null);

    const { updateList, attribute } = useDnd({
        initList: { ...dataList },
    });

    const _openPage = (e) => {
        setPageModal(true);
        setId(Number(e.currentTarget.dataset.value));
        setParent(e.currentTarget.parentElement.parentElement.id);
    };

    useEffect(() => {
        dispatch(getListAction(updateList));
    }, [updateList]);

    return (
        <>
            <main>
                {lists.map((val, idx) => {
                    return (
                        <ul key={idx} id={val} className="list">
                            <div className="title">
                                <div>{titles[idx]}</div>
                                <div onClick={_openPage}>+</div>
                            </div>
                            {dataList[val]?.map((val, idx) => {
                                return (
                                    <li
                                        id={idx}
                                        key={idx}
                                        {...attribute}
                                        data-value={val}
                                        onClick={_openPage}
                                    >
                                        {val}
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
                    parent={parent}
                    closeFunc={() => {
                        setPageModal(false);
                    }}
                />
            )}
        </>
    );
}

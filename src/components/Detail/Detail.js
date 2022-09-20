import "./Detail.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putDetailAction } from "../../modules/action/list";
import { useDebounce } from "../../hooks/useDebounce";
import { Editor } from "../editor/Editor";

export const Detail = ({ id, parent, closeFunc }) => {
    const detail = useSelector((state) => {
        return state.list?.[parent].filter((val) => {
            return val.id === id;
        })[0];
    });

    const dispatch = useDispatch();

    const { handler } = useDebounce(2000);

    useEffect(() => {}, []);

    const _onChange = (e) => {
        handler(() =>
            dispatch(
                putDetailAction({
                    parent,
                    detail: {
                        ...detail,
                        [e.target.name]: e.target.value,
                        modifyAt: `yy`,
                    },
                })
            )
        );
    };

    return (
        <article className="modal">
            <div className="box">
                <section id="top">
                    <div>
                        <label htmlFor="title">제목:</label>
                        <input
                            name="title"
                            defaultValue={detail?.title || "제목없음"}
                            onChange={_onChange}
                        />
                    </div>
                    <div>작성자: {detail?.writer}</div>
                    <div>작성일: {detail?.createAt}</div>
                    <div>수정일: {detail?.modifyAt}</div>
                    <div onClick={closeFunc}>X</div>
                </section>
                <Editor />
            </div>
        </article>
    );
};

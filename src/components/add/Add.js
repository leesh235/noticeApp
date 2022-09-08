import "./Add.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addListAction } from "../../modules/action/list";
import { useInput } from "../../hooks/useInput";

export const Add = ({ parent, closeFunc }) => {
    const dispatch = useDispatch();

    const post = useInput("");

    useEffect(() => {
        // return () => {
        //     if (post.value !== "") {
        //         dispatch(addListAction({ parent, post: post.value }));
        //     }
        // };
    }, []);

    return (
        <article className="modal">
            <div className="box">
                <section id="top">
                    <div>제목: </div>
                    <div>작성자</div>
                    <div>작성일</div>
                    <div>수정일</div>
                    <div onClick={closeFunc}>X</div>
                </section>
                <section id="contents">
                    <input {...post} />
                </section>
            </div>
        </article>
    );
};

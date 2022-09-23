import "./Editor.css";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { InputController } from "./InputController/InputController";

export const Editor = ({ id }) => {
    const editorRef = useRef(null);

    const contents = useSelector((state) => {
        return state.detail[id]?.contents;
    });

    useEffect(() => {
        console.log(contents);
    }, [contents]);

    return (
        <section id="editor" ref={editorRef}>
            {contents?.map((val, idx) => {
                return (
                    <InputController
                        key={val.id}
                        detailId={id}
                        value={val}
                        isLast={idx === contents?.length - 1}
                    />
                );
            })}
        </section>
    );
};

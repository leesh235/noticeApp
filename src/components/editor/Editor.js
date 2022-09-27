import "./Editor.css";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { InputController } from "./InputController/InputController";

export const Editor = ({ id }) => {
    const editorRef = useRef(null);

    const contents = useSelector((state) => {
        return state.contents[id];
    });

    useEffect(() => {}, [contents]);

    return (
        <section id="editor" ref={editorRef}>
            {contents?.map((val, idx) => {
                return (
                    <InputController
                        key={val.id}
                        noticeId={id}
                        value={val}
                        isLast={idx === contents?.length - 1}
                    />
                );
            })}
        </section>
    );
};

import "./Editor.css";
import { useState, useRef, useEffect } from "react";

const menuList = ["기본", "할일", "리스트"];

export const Editor = () => {
    const editorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(0);
    const [list, setList] = useState([1]);

    const _open = (e) => {
        setOpen(!open);
    };

    const _changeType = (e) => {
        e.stopPropagation();
        setType(Number(e.currentTarget.id));
        setOpen(false);
    };

    const _onInput = (e) => {
        console.log(editorRef.current);
    };

    const _onKeyDown = (e) => {
        console.log(e.currentTarget.id);
        if (e.nativeEvent.isComposing) return;
        if (e.key === "Enter" && !e.shiftKey) {
            setList((prev) => prev.concat([list + 1]));
            e.currentTarget.blur();
        }
    };

    useEffect(() => {
        if (list.length === 1) return;
        const nextInput =
            document.querySelector("#editor").childNodes[list.length - 1]
                .childNodes[2];
        while (nextInput.hasChildNodes()) {
            nextInput.removeChild(nextInput.firstChild);
        }
        nextInput.focus();
    }, [list]);

    return (
        <section id="editor" ref={editorRef}>
            {list.map((val, idx) => {
                return (
                    <div className="line_wrapper" key={idx}>
                        <div className="input_type_btn" onClick={_open}>
                            {open && (
                                <ul className="input_type_menu">
                                    {menuList.map((val, index) => {
                                        return (
                                            <li
                                                key={index}
                                                id={index}
                                                className="input_type_item"
                                                onClick={_changeType}
                                            >
                                                {val}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                        <div className="dnd_btn"></div>
                        <div
                            id={idx}
                            className="input_type"
                            contentEditable={true}
                            // onInput={_onInput}
                            onKeyDown={_onKeyDown}
                        />
                        {/* {type === 1 && (
                            <div id="check_input">
                            <input type="checkbox" onChange={_changeType} />
                            <input placeholder={"할일"} />
                            </div>
                            )}
                        {type === 2 && <input placeholder={"리스트"} />} */}
                    </div>
                );
            })}
        </section>
    );
};

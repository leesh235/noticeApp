import "./Editor.css";
import { useState } from "react";

const menuList = ["기본", "할일", "리스트"];

export const Editor = () => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(0);

    const _open = (e) => {
        setOpen(!open);
    };

    const _changeType = (e) => {
        e.stopPropagation();
        setType(Number(e.currentTarget.id));
        setOpen(false);
    };

    return (
        <div id="input_cont">
            <div id="control_btn" onClick={_open}>
                {open && (
                    <ul id="type_menu">
                        {menuList.map((val, idx) => {
                            return (
                                <li
                                    key={idx}
                                    id={idx}
                                    className="type_item"
                                    onClick={_changeType}
                                >
                                    {val}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
            {type === 0 && (
                <span
                    style={{ width: 200, height: 100 }}
                    contentEditable={true}
                    onInput={(e) => {
                        console.log(e.key);
                    }}
                    onKeyDown={(e) => {
                        console.log(e.keyCode);
                    }}
                />
            )}
            {type === 1 && (
                <div id="check_input">
                    <input type="checkbox" onChange={_onChange} />
                    <input placeholder={"할일"} />
                </div>
            )}
            {type === 2 && <input placeholder={"리스트"} />}
        </div>
    );
};

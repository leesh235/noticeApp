import { useEffect, useState, useRef } from "react";
import "./InputController.css";
import { useDispatch } from "react-redux";
import {
    addContentsAction,
    putContentsAction,
} from "../../../modules/action/contents";
import { useDebounce } from "../../../hooks/useDebounce";

const menuList = ["기본", "할일", "리스트"];

export const InputController = ({ noticeId, value, isLast, currFocus }) => {
    const dispatch = useDispatch();
    const focusRef = useRef(null);
    const { handler } = useDebounce(500);

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

    const _onKeyDown = (e) => {
        if (e.nativeEvent?.isComposing) return;
        if (e.key === "Enter" && e.shiftKey) return;
        else if (e.key === "Enter") {
            handler(() => {
                dispatch(
                    addContentsAction({
                        noticeId,
                    })
                );
            });
            e.currentTarget.blur();
        }
    };

    const _onInput = (e) => {
        const { innerText } = e.currentTarget;
        handler(() => {
            dispatch(
                putContentsAction({
                    id: value.id,
                    value: innerText,
                })
            );
        });
    };

    const _onFocus = (e) => {
        console.log("focus");
        const { innerText } = e.currentTarget;
        if (innerText?.length === 0) return;

        const selection = window.getSelection();
        const newRange = document.createRange();
        newRange.selectNodeContents(e.currentTarget);
        newRange.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(newRange);
    };

    useEffect(() => {
        if (isLast) {
            const selection = window.getSelection();
            const newRange = document.createRange();
            newRange.selectNodeContents(focusRef.current);
            newRange.collapse(false);
            selection?.removeAllRanges();
            selection?.addRange(newRange);
            focusRef.current.focus();
        }
    }, [isLast]);

    return (
        <div className="line_wrapper">
            <div className="input_menu_btn" onClick={_open}>
                M
                {open && (
                    <ul className="input_menu">
                        {menuList.map((val, index) => {
                            return (
                                <li
                                    key={index}
                                    id={index}
                                    className="input_item"
                                    onClick={_changeType}
                                >
                                    {val}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
            <div className="dnd_btn">D</div>
            <div
                ref={focusRef}
                className="custom_input"
                contentEditable={true}
                suppressContentEditableWarning={true} //임시방편
                onKeyDown={_onKeyDown}
                onInput={_onInput}
                onFocus={_onFocus}
                placeholder="내용을 입력하세요."
            >
                {value?.value || ""}
            </div>
        </div>
    );
};

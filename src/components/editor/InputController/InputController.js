import { useEffect, useState, useRef } from "react";
import "./InputController.css";
import { useDispatch } from "react-redux";
import { putDetailAction } from "../../../modules/action/detail";
import { useDebounce } from "../../../hooks/useDebounce";

const menuList = ["기본", "할일", "리스트"];

export const InputController = ({ detailId, value, isLast, currFocus }) => {
    const dispatch = useDispatch();
    const focusRef = useRef(null);
    const { handler } = useDebounce(500);

    const [open, setOpen] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
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
                    putDetailAction({
                        id: detailId,
                        contentId: value.id,
                        value: "",
                    })
                );
            });
            e.currentTarget.blur();
        }
    };

    const _onInput = (e) => {
        console.log(e.currentTarget?.innerText);
        const { innerText } = e.currentTarget;
        handler(() => {
            dispatch(
                putDetailAction({
                    id: detailId,
                    contentId: value.id,
                    value: innerText,
                })
            );
        });
    };

    useEffect(() => {
        if (isLast) focusRef.current.focus();
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
                                    onFocus={(e) => {}}
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
                placeholder="내용을 입력하세요."
            >
                {value?.value || ""}
            </div>
        </div>
    );
};

import "./Detail.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putDetailAction } from "../../modules/action/detail";
import { getDetailAction } from "../../modules/action/detail";
import { useDebounce } from "../../hooks/useDebounce";
import { Editor } from "../editor/Editor";

export const Detail = ({ id, parent, closeFunc }) => {
    const title = useSelector((state) => {
        return state.detail[id]?.title;
    });
    const writer = useSelector((state) => {
        return state.detail[id]?.writer;
    });
    const createAt = useSelector((state) => {
        return state.detail[id]?.createAt;
    });
    const modifyAt = useSelector((state) => {
        return state.detail[id]?.modifyAt;
    });

    const dispatch = useDispatch();

    const { handler } = useDebounce(2000);

    const _onChange = (e) => {
        handler(() =>
            dispatch(
                putDetailAction({
                    id,
                    [e.target.name]: e.target.value,
                    modifyAt: `yy`,
                })
            )
        );
    };

    useEffect(() => {
        dispatch(getDetailAction({ id }));
    }, []);

    return (
        <article className="modal">
            <div className="box">
                <section id="top">
                    <div>
                        <label htmlFor="title">제목:</label>
                        <input
                            name="title"
                            defaultValue={title}
                            placeholder={"제목없음"}
                            onChange={_onChange}
                        />
                    </div>
                    <div>작성자: {writer}</div>
                    <div>작성일: {createAt}</div>
                    <div>수정일: {modifyAt}</div>
                    <div onClick={closeFunc}>X</div>
                </section>
                <Editor id={id} parent={parent} />
            </div>
        </article>
    );
};

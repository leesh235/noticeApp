import "./Detail.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putDetailAction } from "../../modules/action/detail";
import { getDetailAction } from "../../modules/action/detail";
import { getContentsAction } from "../../modules/action/contents";
import { useDebounce } from "../../hooks/useDebounce";
import { Editor } from "../editor/Editor";
import { currnetDate } from "../../utils/date";

export const Detail = ({ id, closeFunc }) => {
    const dispatch = useDispatch();
    const { handler } = useDebounce(2000);

    const detail = useSelector((state) => {
        return state.detail[id];
    });

    const _onChange = (e) => {
        handler(() =>
            dispatch(
                putDetailAction({
                    id,
                    [e.target.name]: e.target.value,
                    modifyAt: `${currnetDate()}`,
                })
            )
        );
    };

    useEffect(() => {
        dispatch(getContentsAction({ noticeId: id }));
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
                            defaultValue={detail?.title}
                            placeholder={"제목없음"}
                            onChange={_onChange}
                        />
                    </div>
                    <div>작성자: {detail?.writer}</div>
                    <div>작성일: {detail?.createAt}</div>
                    <div>수정일: {detail?.modifyAt}</div>
                    <div onClick={closeFunc}>X</div>
                </section>
                <Editor id={id} parent={detail?.type} />
            </div>
        </article>
    );
};

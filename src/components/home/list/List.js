import "./List.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addListAction } from "../../../modules/action/list";
import { currnetDate } from "../../../utils/date";
import { Dnd } from "../dnd/Dnd";
import { Detail } from "../../detail/Detail";

export const List = () => {
    const dispatch = useDispatch();

    const dataList = useSelector((state) => state?.list);

    const [modal, setModal] = useState(false);
    const [selectId, setSelectId] = useState(null);

    const _addList = (val) => {
        dispatch(
            addListAction({
                type: val,
                writer: `user1`,
                createAt: currnetDate(),
                modifyAt: ``,
            })
        );
        setModal(true);
    };

    const _openModal = (val) => {
        setModal(true);
        setSelectId(val);
    };

    const _closeModal = (val) => {
        setModal(false);
    };

    useEffect(() => {}, []);

    return (
        <>
            <Dnd data={dataList} addList={_addList} openModal={_openModal} />
            {modal && <Detail id={selectId} closeFunc={_closeModal} />}
        </>
    );
};

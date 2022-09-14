import { db } from "../../utils/db";
import { GETLIST, ADDLIST, PUTDETAIL } from "../action/list";

const initState = {
    todos: db.notice.todos,
    progress: db.notice.progress,
    complete: db.notice.complete,
};

const reducer = (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case GETLIST:
            return data;
        case ADDLIST:
            return {
                ...state,
                [data.parent]: [...state[data.parent], data.post],
            };
        case PUTDETAIL:
            const newList = state[data.parent].map((val, idx) => {
                if (val.id === data.detail.id) return { ...data.detail };
                else return { ...val };
            });
            return {
                ...state,
                [data.parent]: [...newList],
            };
        default:
            return state;
    }
};
export default reducer;

import { db } from "../../utils/db";
import { GETLIST, ADDLIST } from "../action/list";

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
        default:
            return state;
    }
};
export default reducer;

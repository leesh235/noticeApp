import { getList, addList } from "../../utils/api";
import { GETLIST, ADDLIST } from "../action/list";

const initState = {
    todos: [],
    progress: [],
    complete: [],
};

const reducer = (state = initState, action) => {
    const { type, data } = action;

    switch (type) {
        case GETLIST:
            return {
                todos: getList({ type: "todos" }),
                progress: getList({ type: "progress" }),
                complete: getList({ type: "complete" }),
            };
        case ADDLIST:
            return {
                ...state,
                [data.type]: [...state[data.type], addList(data)],
            };
        default:
            return state;
    }
};
export default reducer;

import {
    getContents,
    addContents,
    putContents,
    deleteContents,
} from "../../utils/api";
import {
    ADDCONTENTS,
    DELETECONTENTS,
    PUTCONTENTS,
    GETCONTENTS,
} from "../action/contents";

const initState = {};

const reducer = (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case GETCONTENTS:
            return {
                ...state,
                [data.noticeId]: getContents(data),
            };
        case ADDCONTENTS:
            return {
                ...state,
                [data.noticeId]: [...state[data.noticeId], addContents(data)],
            };
        case PUTCONTENTS:
            return {
                ...state,
                [data.noticeId]: putContents(data),
            };
        case DELETECONTENTS:
            return {
                ...state,
            };
        default:
            return state;
    }
};
export default reducer;

import { getDetail, putDetail, deleteDetail } from "../../utils/api";
import { GETDETAIL, PUTDETAIL } from "../action/detail";

const initState = {};

const reducer = (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case GETDETAIL:
            return { ...state, [data.id]: getDetail(data) };
        case PUTDETAIL:
            return {
                ...state,
                [data.id]: putDetail(data),
            };
        default:
            return state;
    }
};
export default reducer;

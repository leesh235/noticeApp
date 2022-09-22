import { db } from "../../utils/db";
import { GETDETAIL, PUTDETAIL } from "../action/detail";

const initState = {};

const reducer = (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case GETDETAIL:
            return { ...state, data };
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

import { GETLIST } from "../action/list";

const initState = {};

const reducer = (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case GETLIST:
            return {
                ...state,
                ...data,
            };
        default:
            return state;
    }
};
export default reducer;

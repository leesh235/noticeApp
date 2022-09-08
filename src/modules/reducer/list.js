import { GETLIST, ADDLIST } from "../action/list";

const initState = {
    todos: [1, 2, 3, 4, 5, 6],
    progress: [7, 8, 9, 10, 11, 12],
    complete: [13, 14, 15, 16, 17, 18],
};

const reducer = (state = initState, action) => {
    const { type, data } = action;
    console.log(data);
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

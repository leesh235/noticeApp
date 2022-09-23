import { db } from "../../utils/db";
import { GETDETAIL, PUTDETAIL } from "../action/detail";

const initState = {};

const reducer = (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case GETDETAIL:
            return { ...state, [data.id]: db.detail[data.id] };
        case PUTDETAIL:
            let contents = state[data.id].contents;
            if (data?.value !== "") {
                const newContents = contents.map((val) => {
                    if (val.id === data.contentId)
                        return { ...val, value: data.value };
                    else return { ...val };
                });
                console.log(newContents);
                contents = newContents;
            } else if (data.value === "") {
                contents = [
                    ...contents,
                    {
                        id: state[data.id].contents.length,
                        value: data.value,
                    },
                ];
            }
            console.log(contents);
            return {
                ...state,
                [data.id]: {
                    ...state[data.id],
                    title: data.title || state[data.id].title,
                    modifyAt: data.modifyAt || state[data.id].modifyAt,
                    contents,
                },
            };
        default:
            return state;
    }
};
export default reducer;

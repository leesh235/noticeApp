export const GETLIST = "list/GETLIST";
export const ADDLIST = "list/ADDLIST";
export const PUTDETAIL = "list/PUTDETAIL";

export const getListAction = (data) => {
    return {
        type: GETLIST,
        data,
    };
};

export const addListAction = (data) => {
    return {
        type: ADDLIST,
        data,
    };
};

export const putDetailAction = (data) => {
    return {
        type: PUTDETAIL,
        data,
    };
};

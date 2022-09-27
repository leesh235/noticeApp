export const GETCONTENTS = "contents/GETCONTENTS";
export const PUTCONTENTS = "contents/PUTCONTENTS";
export const DELETECONTENTS = "contents/DELETECONTENTS";
export const ADDCONTENTS = "contents/ADDCONTENTS";

export const getContentsAction = (data) => {
    return {
        type: GETCONTENTS,
        data,
    };
};

export const putContentsAction = (data) => {
    return {
        type: PUTCONTENTS,
        data,
    };
};

export const addContentsAction = (data) => {
    return {
        type: ADDCONTENTS,
        data,
    };
};

export const deleteContentsAction = (data) => {
    return {
        type: DELETECONTENTS,
        data,
    };
};

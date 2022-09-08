export const GETLIST = "list/GETLIST";

export const getListAction = (data) => {
    return {
        type: GETLIST,
        data,
    };
};

export const GETDETAIL = "detail/GETDETAIL";
export const PUTDETAIL = "detail/PUTDETAIL";

export const getDetailAction = (data) => {
    return {
        type: GETDETAIL,
        data,
    };
};

export const putDetailAction = (data) => {
    return {
        type: PUTDETAIL,
        data,
    };
};

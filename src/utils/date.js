const today = new Date();

export const currnetDate = () => {
    return `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
};

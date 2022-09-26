import { v4 } from "uuid";

export const uuid = () => {
    const tokens = v4().split("-");
    return (
        tokens[0] + tokens[0] + tokens[1] + tokens[2] + tokens[3] + tokens[4]
    );
};

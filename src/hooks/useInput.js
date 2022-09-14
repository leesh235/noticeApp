import { useState } from "react";

export const useInput = (initValue = "") => {
    const [defaultValue, setValue] = useState(initValue);

    const onChange = (e) => {
        console.log(e.target.value);
        setValue(e.target.value);
    };

    return { defaultValue, onChange };
};

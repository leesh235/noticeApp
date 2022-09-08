import { useState, useEffect } from "react";

export const useInput = (initValue = "") => {
    const [value, setValue] = useState(initValue);

    const onInput = (e) => {
        setValue(e.target.value);
    };

    useEffect(() => {}, [value]);

    return { value, onInput };
};

import { useRef, useCallback } from "react";

export const useDebounce = (delay) => {
    const timer = useRef(null);

    const handler = useCallback((api) => {
        if (timer.current !== null) clearTimeout(timer.current);

        timer.current = setTimeout(async () => {
            await api();
        }, delay);
    });

    return { handler };
};

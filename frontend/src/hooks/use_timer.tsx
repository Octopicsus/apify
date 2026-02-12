import { useEffect, useState } from 'react';

/**
 * This hook exists only to force rerender of the app every 1 second
 * to simulate the matrix being a part of larger app.
 */
export const useTimer = (): void => {
    const [, setTime] = useState(Date.now());
    useEffect(() => {
        const interval = window.setInterval(() => {
            setTime(Date.now());
        }, 1000);
        return () => {
            window.clearInterval(interval);
        };
    }, [setTime]);
};

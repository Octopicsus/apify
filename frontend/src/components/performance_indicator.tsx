import clsx from 'clsx';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const PERFORMANCE_LEVELS = [
    'Good performance',
    'There are some hickups',
    'Performance is not great, some optimization is needed',
    'Wow something is really slow',
];

const PerformanceIndicatorWrapper = styled.div`
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;

    &.performanceLevel-0 {
        background-color: green;
    }

    &.performanceLevel-1 {
        background-color: orange;
    }

    &.performanceLevel-2 {
        background-color: red;
    }

    &.performanceLevel-3 {
        background-color: purple;
    }
`;

export const PerformanceIndicator: FC = () => {
    const [performance, setPerformance] = useState<{ level: number; at: number }>({ level: 0, at: Date.now() });
    const timeRef = useRef(Date.now());
    const isInFocusRef = useRef(true);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();

            if (!isInFocusRef.current) return;

            const timeDifference = Date.now() - timeRef.current;

            if (timeDifference > 1500) {
                setPerformance({ level: 3, at: now });
            } else if (timeDifference > 750) {
                setPerformance((currentPerformance) => {
                    if (currentPerformance.level > 2 && now - currentPerformance.at < 5000) return currentPerformance;
                    return { level: 2, at: now };
                });
            } else if (timeDifference > 350) {
                setPerformance((currentPerformance) => {
                    if (currentPerformance.level > 1 && now - currentPerformance.at < 5000) return currentPerformance;
                    return { level: 1, at: now };
                });
            } else {
                setPerformance((currentPerformance) => {
                    if (currentPerformance.level > 0 && now - currentPerformance.at < 5000) return currentPerformance;
                    if (currentPerformance.level === 0) return currentPerformance; // optimization to prevent rerenders
                    return { level: 0, at: now };
                });
            }
            timeRef.current = now;
        }, 50);

        return () => {
            clearInterval(interval);
        };
    }, [setPerformance]);

    useEffect(() => {
        const onFocus = () => {
            isInFocusRef.current = true;
            timeRef.current = Date.now();
        };
        const onBlur = () => {
            isInFocusRef.current = false;
        };
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);
        return () => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        };
    }, []);

    const classNames = clsx('performance-indicator', `performanceLevel-${performance.level}`);

    return (
        <PerformanceIndicatorWrapper
            className={classNames}
            title={PERFORMANCE_LEVELS[performance.level]}
            data-performance-level={performance.level}
        />
    );
};

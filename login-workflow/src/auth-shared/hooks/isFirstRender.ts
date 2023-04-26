/**
 * @packageDocumentation
 * @module Hooks
 * @internal
 */

import { useRef, useEffect } from 'react';

export const useIsFirstRender = (): boolean => {
    const isFirstRender = useRef(true);
    useEffect(() => {
        isFirstRender.current = false;
    }, []);
    return isFirstRender.current;
};

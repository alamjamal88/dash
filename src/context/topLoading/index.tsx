import React, { createContext, useContext, useRef } from 'react';
import TopLoadingBar from 'react-top-loading-bar';

// Create a context
const LoadingBarContext = createContext({
    setProgress: (progress: number) => {},
    startLoading: () => {},
    finishLoading: () => {}
});

// Export the hook
export const useLoadingBar = () => useContext(LoadingBarContext);

// Create a provider
export const LoadingBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const ref = useRef<any>(null);

    const setProgress = (progress: number) => {
        if (ref.current) {
            ref.current.continuousStart(progress);
        }
    };

    const startLoading = () => {
        if (ref.current) {
            ref.current.continuousStart();
        }
    };

    const finishLoading = () => {
        if (ref.current) {
            ref.current.complete();
        }
    };

    return (
        <LoadingBarContext.Provider value={{ setProgress, startLoading, finishLoading }}>
            <TopLoadingBar color="#5D87FF" height={3} ref={ref} />
            {children}
        </LoadingBarContext.Provider>
    );
};

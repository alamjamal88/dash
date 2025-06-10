// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import React, { Suspense } from 'react';

// project imports
// import Spinner from 'src/views/spinner/Spinner';
// import LoadingBar from '../../../../LoadingBar';
// import TopLoadingBar from 'react-top-loading-bar';

// ===========================|| LOADABLE - LAZY LOADING ||=========================== //

// const Loadable = (Component: any) => (props: any) =>
//   (
//     <Suspense fallback={<TopLoadingBar height={3} />}>
//       <Component {...props} />
//     </Suspense>
//   );

// export default Loadable;

import React, { Suspense, useEffect } from 'react';
import { useLoadingBar } from 'src/context/topLoading';

// Lazy loading wrapper
const Loadable = (Component: any) => (props: any) => {
    const { startLoading, finishLoading } = useLoadingBar();

    useEffect(() => {
        startLoading(); // Start the loading bar when the component starts loading
        return () => finishLoading(); // Complete the loading bar when done
    }, [startLoading, finishLoading]);

    return (
        <Suspense fallback={null}>
            <Component {...props} />
        </Suspense>
    );
};

export default Loadable;

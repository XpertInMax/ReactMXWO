import React from 'react';
import loaderIcon from '../../assets/images/circle-loader.svg';

const Loader = () => {
    return <div>
        <img
            className="h-16 w-auto"
            src={loaderIcon}
            alt="GAF Logo"
        />
    </div>
} ;

export default Loader;

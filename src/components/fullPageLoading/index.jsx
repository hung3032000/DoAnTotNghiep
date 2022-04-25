import React from "react";
import PropTypes from 'prop-types';
import "./loader.css";
Loader.propTypes = {
    showLoader: PropTypes.bool.isRequired
};
function Loader(props) {
    const showLoader = props.showLoader;
    return (
        <div className={showLoader ? 'd-block' : 'd-none'}>
            <div className="loaders-container">
                <div className="container">
                    <div className="circle"></div>
                </div>
            </div>
            <div className="lk-overlay"></div>
        </div>
    )
}
export default Loader;

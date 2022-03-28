import React from "react";
import "./loader.css";
import {connect} from "react-redux";
// import { useStateValue } from "../../../StateProvider";

function Loader(props) {
    // let [{ showLoader }, dispatch] = useStateValue();
    let showLoader = false;
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
const map =  state => ({
    loading: state.loading,
})
export default connect(map)(Loader);
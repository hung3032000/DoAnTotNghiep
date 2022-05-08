import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import PropTypes from 'prop-types';

Modal.propTypes = {
  classNameModal: PropTypes.string,
  label: PropTypes.string
};
function Modal(props) {
  const { label, classNameModal} = props;
  const [state, setState] = useState({});
  const anchor = 'right';
  const toggleDrawer = (anchor, action) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: action });
  };
  const list = (anchor) => (
    <div role="presentation">
      <div className="ui-dialog ui-wrap">
        <div className="ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle">
          <button type="button" className="btn-close" title="Close" onClick={toggleDrawer(anchor, false)}>
            <span>
              <i className="icon_Close"></i>
            </span>
          </button>
        </div>
        <div className="dialog-content ui-dialog-content ui-widget-content child-content">{props.children}</div>
      </div>
    </div>
  );

  return (
    <>
      <button className={classNameModal} onClick={toggleDrawer(anchor, true)}>
        {label}
      </button>
      <SwipeableDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} onOpen={toggleDrawer(anchor, true)}>
        {list(anchor)}
      </SwipeableDrawer>
    </>
  );
}

export default Modal;

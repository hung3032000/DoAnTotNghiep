import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import "./style.css"
import PropTypes from 'prop-types';

Modal.propTypes = {
  classNameModal: PropTypes.string,
  label: PropTypes.string
};
function Modal(props) {
  const {label,classNameModal} = props;
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="ui-dialog test1">
        <div className="ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle">
          <button type="button" className="test2" title="Close" onClick={toggleDrawer(anchor, false)}>
            <span>
              <i className="icon_Close"></i>
            </span>
          </button>
        </div>
        <div className="dialog-content ui-dialog-content ui-widget-content test3">
          {props.children}
        </div>
        
      </div>
    </div>
  );
  const anchor = 'right';
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
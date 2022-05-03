import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import "./style.css"
function Modal(props) {
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
      <div class="ui-dialog test1">
        <div class="ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle">
          <button type="button" class="test2" title="Close" onClick={toggleDrawer(anchor, false)}>
            <span>
              <i class="icon_Close"></i>
            </span>
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
  const anchor = 'right';
  return (
    <>
      <button className="form-button secondary" onClick={toggleDrawer(anchor, true)}>
      <h2>Thông tin món hàng</h2>
      </button>
      <SwipeableDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} onOpen={toggleDrawer(anchor, true)}>
        {list(anchor)}
      </SwipeableDrawer>
    </>
  );
}

export default Modal;

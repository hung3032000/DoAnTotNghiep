import './style.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useForm } from 'react-hook-form';
// import Loader from 'components/fullPageLoading';

Index.propTypes = {
  classNameModal: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.array,
};

function Index(props) {
  const { color } = props;
  const [state, setState] = useState({});
  const anchor = 'right';
  // const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState("Chọn Màu");

  const toggleDrawer = (anchor, action) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: action });
  };




  const form = useForm({
    defaultValues: {
      colors: "",
    },
  });
  const handleSubmit = async () => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(colors);
    }
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
        <div className="dialog-content ui-dialog-content ui-widget-content child-content">
          <div className="color-variation-swiper product-detail-modal">
            <h2>Colors</h2>
            <section className="attribute color-variation-swiper-container" aria-roledescription="carousel">
              <div className="value swiper-container">
                <div className="swatches color swiper-wrapper">
                  {color.map((i) => (
                    <>
                      {i.colors.map((i2) => (
                        <div key={i2._id} className="selectable attrvalue swiper-slide" aria-roledescription="slide">
                          <form onSubmit={form.handleSubmit(handleSubmit)}>
                            <button
                              className="swatchanchor anchor"
                              onClick={() => {
                                setColors(i2.colorName);
                              }}
                            >
                              <img src="/image/imgBag.jpg" alt="HomieReal" onClick={toggleDrawer(anchor, false)} />
                              <div className="variation-infos" onClick={toggleDrawer(anchor, false)}>
                                <p className="variation-name">{i2.colorName}</p>
                              </div>
                            </button>
                          </form>
                        </div>
                      ))}
                    </>
                  ))}
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* <Loader showLoader={loading} /> */}

      <div className="variation-attribute variation-color">
        <h2 className="attribute-header">
          <span className="label">
            <span className="attribute-name">{colors}</span>
          </span>
        </h2>
        <button className="btn btn-link-secondary button-text" onClick={toggleDrawer(anchor, true)}>
          Chọn Màu
        </button>
        <SwipeableDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} onOpen={toggleDrawer(anchor, true)}>
          {list(anchor)}
        </SwipeableDrawer>
      </div>
    </>
  );
}

export default Index;

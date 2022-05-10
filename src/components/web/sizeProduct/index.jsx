import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/web/modal/modal';

Index.propTypes = {
    size: PropTypes.array,
};

function Index(props) {
    const {size} = props;
  return (
    <div className="variation-attribute ">
      <div className="size-popin">
        <div className="size-popin-container">
          <ul>
          {size.map((i) => (
            <li key={i._id} className="selectable attrvalue" onClick={()=>{
                  console.log("Helloo"+ i.nameSize)}}>
              <button className="swatchanchor anchor">
                <span className="" title="Select Size: XS">
                  {i.nameSize}
                </span>
              </button>
            </li>
          ))}
            <li className="selectable attrvalue" onClick={()=>{
                  console.log("Helloo")
              }}>
              <button className="swatchanchor anchor">
                <span className="unavailable-size" title="Select Size: XXL (Unavailable)">
                  XXL
                </span>
              </button>
            </li>
          </ul>
          <Modal classNameModal={'btn btn-link-secondary button-text'} label={'Size guide'}>
            Hello
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Index;

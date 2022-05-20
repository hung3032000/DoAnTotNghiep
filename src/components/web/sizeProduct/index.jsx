import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/web/modal/modal';
import { useForm } from 'react-hook-form';

Index.propTypes = {
  size: PropTypes.array,
  color: PropTypes.string,
};

function Index(props) {
  const { size, color } = props;
  const categoryOptions = [
    { label: 'XXS', value: 'XXS', _id: 0 },
    { label: 'XS', value: 'XS', _id: 1 },
    { label: 'S', value: 'S', _id: 2 },
    { label: 'M', value: 'M', _id: 3 },
    { label: 'L', value: 'L', _id: 4 },
    { label: 'XL', value: 'XL', _id: 5 },
    { label: 'XXL', value: 'XXL', _id: 6 },
  ];
  const [sizes, setSizes] = useState();
  const [choosers, setChoosers] = useState(-1);

  const arrayFilter = () => {
    let array = [];
    size.forEach((i) => {
      i.colors.forEach((i2) => {
        if (color === i2.colorName) {
          array.push({ _id: i._id, nameSize: i.nameSize, quantity: i2.quantity });
        }
      });
    });
    return array;
  };

  const form = useForm({
    defaultValues: {
      sizes: '',
    },
  });
  const handleSubmit = async () => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(sizes);
    }
  };

  const clasSize = (i) => {
    if (arrayFilter().some((item) => i.value === item.nameSize)) {
      return '';
    }
    return 'size-disable';
  };
  return (
    <div className="variation-attribute ">
      <div className="size-popin">
        <div className="size-popin-container">
          <ul>
            {categoryOptions.map((i) => (
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <li
                  key={i._id}
                  className={`${choosers === i._id ? 'selected attrvalue' : 'selectable attrvalue'} ` + clasSize(i)}
                  onClick={() => {
                    setSizes(i.value);
                    setChoosers(i._id);
                  }}
                >
                  <button className="swatchanchor anchor">
                    <span className={arrayFilter().some((item) => i.value === item.nameSize) ? '' : 'unavailable-size'} title={'Chọn Size: ' + i.label}>
                      {i.label}
                    </span>
                  </button>
                </li>
              </form>
            ))}
          </ul>
          <Modal classNameModal={'btn btn-link-secondary button-text'} label={'Size guide'}>
            <img src="/image/size-guild.jpg" alt="HomieReal" />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Index;

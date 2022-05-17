import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/web/modal/modal';
import { useForm } from 'react-hook-form';

Index.propTypes = {
  size: PropTypes.array,
};

function Index(props) {
  const { size } = props;
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
    if (size.some((item) => i.value === item.nameSize)) {
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
                  className={ `${choosers === i._id ? 'selected attrvalue' : 'selectable attrvalue'} ` + clasSize(i)}
                  onClick={() => {
                    setChoosers(i._id);
                    setSizes(i.value);
                  }}
                >
                  <button
                    className="swatchanchor anchor"
                  >
                    <span className={(size.some((item) => i.value === item.nameSize) ? "" :
                    "unavailable-size" )} title={'Chọn Size: ' + i.label}>
                      {i.label}
                    </span>
                  </button>
                </li>
              </form>
            ))}
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

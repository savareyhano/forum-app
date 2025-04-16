import PropTypes from 'prop-types';
import React from 'react';

function CategoryItem({ category, filter, isSelected }) {
  const onClickFilter = (event) => {
    event.preventDefault();
    filter(category);
  };

  return (
    <button
      type="button"
      className={`category-item ${isSelected ? 'selected' : ''}`}
      onClick={onClickFilter}
    >
      <p>#{category}</p>
    </button>
  );
}

const categoryItemShape = {
  category: PropTypes.string.isRequired,
};

CategoryItem.propTypes = {
  ...categoryItemShape,
  filter: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export { categoryItemShape };

export default CategoryItem;

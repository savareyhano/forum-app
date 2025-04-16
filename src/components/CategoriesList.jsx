import React from 'react';
import CategoryItem, { categoryItemShape } from './CategoryItem';
import PropTypes from 'prop-types';

function CategoriesList({ categories, filter, selectedCategory }) {
  return (
    <div className="categories-list">
      {categories.map((category) => (
        <CategoryItem
          key={category}
          category={category}
          filter={filter}
          isSelected={category === selectedCategory}
        />
      ))}
    </div>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(categoryItemShape.category).isRequired,
  filter: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
};

export default CategoriesList;

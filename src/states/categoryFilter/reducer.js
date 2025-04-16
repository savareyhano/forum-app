import { ActionType } from './action';

function categoryFilterReducer(selectedCategory = null, action = {}) {
  switch (action.type) {
  case ActionType.TOGGLE_CATEGORY_FILTER:
    // Remove filter when the category is selected again
    return selectedCategory === action.payload.category
      ? null
      : action.payload.category;
  default:
    return selectedCategory;
  }
}

export default categoryFilterReducer;

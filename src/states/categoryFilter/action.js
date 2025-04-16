const ActionType = {
  TOGGLE_CATEGORY_FILTER: 'TOGGLE_CATEGORY_FILTER',
};

function toggleCategoryFilterActionCreator(category) {
  return {
    type: ActionType.TOGGLE_CATEGORY_FILTER,
    payload: {
      category,
    },
  };
}

export { ActionType, toggleCategoryFilterActionCreator };

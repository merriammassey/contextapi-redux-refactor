//import possible actions
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "./actions";

//create function called reducer, passing value of action.type into a switch statement
export const reducer = (state, action) => {
  //compare action.type to possible actions
  switch (action.type) {
    //if action type value is the value of 'UPDATE_RPODUCTS', return a new state object with an updated products array
    //setting products key to new array with action.products value spread across it
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    //if action type value is update_categories, return a new state object with an updated categories array
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };
    //if it's none of these actions, do not update state
    default:
      return state;
  }
};

//updated to include useEffect
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
//updated: import custom hook
import { useStoreContext } from "../../utils/GlobalState";
//updated: import actions
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
//new
import { useDispatch, useSelector } from "react-redux";

//updated: removed { setCategory } prop
function CategoryMenu() {
  //const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  //const categories = categoryData?.categories || [];

  //updated to query Category data and store it to global state object to be used in the UI
  //const [state, dispatch] = useStoreContext();
  //new
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { categories } = state;
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  //updated to include useEffect
  //when component loads and response from useQuery hook above returns, useEffect notices that categoryData is no longer defined, then runs dispatch, setting category data to global state

  //useEffect takes 2 arguments: a function and the condition
  //categoryData will be undefined on load, but useEffect will run when state changes in this component
  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      //update indexeddb
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
      //if we lose internet connection, check if useQuery hook's loading return value exists and if not, pull from indexeddb
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  //updated: update click handler below and add function to update state instead of using function prop from Home
  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;

//import React from "react";
import { useQuery } from "@apollo/client";

import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";
//updated
import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

//updated to remove { currentCategory }
function ProductList() {
  /* const { loading, data } = useQuery(QUERY_PRODUCTS);

  const products = data?.products || [];

  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter(
      (product) => product.category._id === currentCategory
    );
  }
 */

  //updated
  //execute the useStoreContext() function to retrieve the current global state object and the dipatch() method to update state
  const [state, dispatch] = useStoreContext();
  //destructure the currentCategory data out of the state object so we can use it in the filterProducts() function
  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  //wait for useQuery response
  useEffect(() => {
    //if there's data to be stored
    if (data) {
      //when data has a value, save array of product data to global store
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      //and save each product to IndexedDB using the helper function
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    //execute useStore Contact again to deliver product data to display products
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {/* updated from products.length */}
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;

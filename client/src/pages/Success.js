import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../../utils/helpers";
import Jumbotron from "../components/Jumbotron/index.js";

function Success() {
  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the homepage</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;

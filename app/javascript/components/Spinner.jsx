import React from "react";
import { ProgressBar } from "react-loader-spinner";

const Spinner = ({ isLoading }) => (
  <div className={`spinner-container ${isLoading ? "loading" : ""}`}>
    <ProgressBar visible={isLoading} color="#08182f" />
  </div>
);

export default Spinner;

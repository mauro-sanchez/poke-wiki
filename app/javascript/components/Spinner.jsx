import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Spinner = ({ loading }) => (
  <div className={`spinner-container ${loading ? "loading" : ""}`}>
    <InfinitySpin visible={loading} color="#08182f" />
  </div>
);

export default Spinner;

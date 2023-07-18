import React from "react";
// import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import StarRating from "./components/StarRating";

// function Test() {
//   const [movieRating, setMovieRating] = useState();
//   return (
//     <div>
//       <StarRating onSetRating={setMovieRating} />
//       <p>whats up ratting {movieRating}</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating /> */}
    {/* <Test /> */}
  </React.StrictMode>
);

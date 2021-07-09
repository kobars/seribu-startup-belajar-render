import { Fragment } from "react";
import "../styles/globals.css";
import global from "../styles/global";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Component {...pageProps} />
      <style jsx global>
        {global}
      </style>
    </Fragment>
  );
}

export default MyApp;

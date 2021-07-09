import { Fragment, useState } from "react";
import Head from "next/head";

const Nav = ({ children, seoTitle }) => {
  const [helloText, setHelloText] = useState("World");
  const handleTextBayu = () => {
    setHelloText("Kobar");
  };
  const handleTextHasan = () => {
    setHelloText("Arafat");
  };
  return (
    <Fragment>
      <Head>
        <title>{seoTitle}</title>
      </Head>
      <h1 className="title">Hello {helloText}</h1>
      <button className="btn" onClick={handleTextBayu}>
        Kobar
      </button>
      <button className="btn" onClick={handleTextHasan}>
        Arafat
      </button>
      {children}
      <style jsx>
        {`
          .container {
            background-color: #282c34;
            color: white;
            text-align: center;
            min-height: 100vh;
            margin-top: -30px;
            padding: 30px;
          }

          .btn {
            border: 1px solid white;
            background-color: #61dafb;
            width: 100px;
            color: white;
            border-radius: 4px;
            margin: 10px;
            padding: 12px;
            font-weight: bold;
          }

          .btn:focus {
            outline: none;
            border: 2px solid #f89900;
          }

          .btn:hover {
            cursor: pointer;
            background-color: #f89900;
          }

          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }

          td,
          th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
        `}
      </style>
    </Fragment>
  );
};

export default Nav;

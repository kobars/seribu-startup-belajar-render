import React, { useState, Fragment } from "react";

export default function App(props) {
  const [helloText, setHelloText] = useState("World");

  const handleTextBayu = () => {
    setHelloText("Bayu");
  };
  const handleTextHasan = () => {
    setHelloText("Hasan");
  };

  return (
    <div className="container">
      <h1 className="title">Hello {helloText}</h1>
      <button className="btn" onClick={handleTextBayu}>
        Bayu
      </button>
      <button className="btn" onClick={handleTextHasan}>
        Hasan
      </button>
      {props?.tableData?.length > 0 && (
        <Fragment>
          <h1>Movie Table</h1>
          <table>
            <thead>
              <tr>
                <th>Movie Title</th>
                <th>Director</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {props.tableData.map((data) => (
                <tr key={data.id}>
                  <td>{data.title}</td>
                  <td>{data.director}</td>
                  <td>{data.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      )}
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
    </div>
  );
}

export async function getServerSideProps() {
  const resp = await fetch("https://ghibliapi.herokuapp.com/films");
  const res = await resp.json();
  const tableData = res.map((data) => ({
    id: data.id,
    title: data.title,
    director: data.director,
    description: data.description,
  }));

  console.log("tableData", tableData);

  return {
    props: {
      tableData,
    },
  };
}

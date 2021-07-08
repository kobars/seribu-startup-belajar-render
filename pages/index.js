import React, { useState, useEffect, Fragment } from "react";

export default function App() {
  const [helloText, setHelloText] = useState("World");
  const [tableData, setTableData] = useState();

  const handleTextBayu = () => {
    setHelloText("Bayu");
  };
  const handleTextHasan = () => {
    setHelloText("Hasan");
  };

  useEffect(() => {
    const getData = async () => {
      const resp = await fetch("https://ghibliapi.herokuapp.com/films");
      const res = await resp.json();
      setTableData(
        res.map((data) => ({
          id: data.id,
          title: data.title,
          director: data.director,
          description: data.description,
        }))
      );
    };
    getData();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Hello {helloText}</h1>
      <button className="btn" onClick={handleTextBayu}>
        Bayu
      </button>
      <button className="btn" onClick={handleTextHasan}>
        Hasan
      </button>
      {tableData && tableData.length > 0 && (
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
              {tableData.map((data) => (
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
    </div>
  );
}

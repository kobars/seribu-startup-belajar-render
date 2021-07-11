import { Fragment } from "react";

export default function Table({ tableData }) {
  return (
    <Fragment>
      <h1>All Products</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr key={data.id}>
              <td>{data.title}</td>
              <td>{data.price}</td>
              <td>{data.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

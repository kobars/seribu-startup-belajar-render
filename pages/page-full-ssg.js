import React, { Fragment } from "react";
import Layout from "../src/components/layout";
import { getSeoData, getData } from "../src/utils";

// FULL SSG

export default function App({ tableData, title }) {
  return (
    <div className="container">
      <Layout seoTitle={title}>
        {tableData?.length > 0 && (
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
        )}
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const tableData = await getData();
  const title = await getSeoData({ id: 0 });
  return {
    props: {
      tableData,
      title,
    },
  };
}

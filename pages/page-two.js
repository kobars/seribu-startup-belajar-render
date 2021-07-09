import React, { useState, Fragment, useEffect } from "react";
import Layout from "../components/layout";
import { getSeoData, getData } from "../utils";

export default function App({ title }) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      console.log("data", data);
      setTableData(data);
    };
    fetchData();
  }, []);

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

export async function getServerSideProps(context) {
  console.log({ context });
  const id = context.query?.id || 0;
  const title = await getSeoData({ id });
  return {
    props: {
      title,
    },
  };
}

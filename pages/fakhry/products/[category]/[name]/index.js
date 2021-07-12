import React, { Fragment } from "react";
import Layout from "../../../../../components/layout";
import { DEFAULT_SEO } from "../../../../../utils";

// FULL SSG

export default function App({ tableData, SEO }) {
  return (
    <div className="container">
      <Layout seoData={SEO}>
        {tableData?.length > 0 && (
          <Fragment>
            <h1>{`Detail ${SEO.title}`}</h1>
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

export async function getStaticPaths() {
  const getProducts = await fetch("http://localhost:1337/products");
  const products = await getProducts.json();
  const paths = products.map((product) => ({
    params: { category: product.categories[0].slug ,name: product.slug },
  }));
  return {
    // paths: [
    //   { params: { category: "database", name:"gatsby" } },
    // ],
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const getProducstByCategory = await fetch(
    `http://localhost:1337/products/${params.name}`
  );
  console.log("param",params);
  const allProductsByCategory = await getProducstByCategory.json();
  const tableData = [allProductsByCategory];
  console.log("tabledata", tableData);
  // const tableData = [];

  const title = allProductsByCategory.title;
  const author = "Toko Kobar";
  const SEO = {
    ...DEFAULT_SEO,
    title,
    author,
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: "https://toko-kobar.com",
      title,
      site_name: "toko-kobar",
    },
    twitter: {
      card: "summary_large_image",
      site: "@toko-kobar",
      title,
    },
  };

  return {
    props: {
      tableData,
      SEO,
    },
  };
}
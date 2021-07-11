import React, { Fragment } from "react";
import Layout from "../../src/components/layout";
import { DEFAULT_SEO } from "../../src/utils";

// FULL SSG

export default function App({ tableData, SEO }) {
  return (
    <div className="container">
      <Layout seoData={SEO}>
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

export async function getStaticPaths() {
  const getCategories = await fetch(
    "https://be-sekolahbeta.herokuapp.com/categories"
  );
  const categories = await getCategories.json();
  const paths = categories.map((category) => ({
    params: { category: category.slug },
  }));
  return {
    // paths: [
    //   { params: { category: "back" } },
    //   { params: { category: "front" } },
    // ],
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const getProducstByCategory = await fetch(
    `https://be-sekolahbeta.herokuapp.com/categories/${params.category}`
  );
  const allProductsByCategory = await getProducstByCategory.json();
  const tableData = allProductsByCategory?.products;

  const title = allProductsByCategory.name;
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

import React, { Fragment } from "react";
import Layout from "@/components/layout";
import { DEFAULT_SEO } from "@/utils/index";

// FULL SSG

export default function App({ tableData, SEO }) {
  return (
    <div className="container-fluid">
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
  const getProducts = await fetch(`${process.env.BASE_URL}/products`);
  const products = await getProducts.json();
  const paths = products.map((product) => ({
    params: { category: product.categories[0].slug, name: product.slug },
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
    `${process.env.BASE_URL}/products/${params.name}`
  );
  console.log("param", params);
  const allProductsByCategory = await getProducstByCategory.json();
  const tableData = [allProductsByCategory];
  console.log("tabledata", tableData);
  // const tableData = [];

  const title = allProductsByCategory.title;
  const author = "Toko Devi";
  const SEO = {
    ...DEFAULT_SEO,
    title,
    author,
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: "https://toko-devi.com",
      title,
      site_name: "toko-devi",
    },
    twitter: {
      card: "summary_large_image",
      site: "@toko-devi",
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

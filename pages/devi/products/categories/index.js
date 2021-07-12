import React, { Fragment } from "react";
import Layout from "@/components/layout";
import Link from "next/link";
import { getCategories, DEFAULT_SEO } from "@/utils/index";

export default function App({ SEO, tableData }) {
  return (
    <div className="container-fluid">
      <Layout seoData={SEO}>
        {tableData?.length > 0 && (
          <Fragment>
            <h1>All Categories</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>
                      <Link
                        key={category.slug}
                        href={`/devi/products/categories/${category.slug}`}
                        passHref
                      >
                        {category.name}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Fragment>
        )}
      </Layout>
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

export async function getStaticProps() {
  const tableData = await getCategories();
  const title = "Categories";
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
      SEO,
      tableData,
    },
    revalidate: 10, // => mengijinkan proses revalidasi 1x dalam xx seconds
  };
}

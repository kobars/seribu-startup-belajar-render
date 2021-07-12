import React, { Fragment } from "react";
import Link from "next/link";
import Layout from "@/components/layout";
import { DEFAULT_SEO } from "@/utils/index";

// FULL SSG

export default function App({ tableData, SEO }) {
  return (
    <div className="container-fluid">
      <Layout seoData={SEO}>
        {tableData?.length > 0 && (
          <Fragment>
            <h1>{`List ${SEO.title} Category`}</h1>
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
                    <td>
                      <Link
                        key={data.slug}
                        href={`/devi/products/categories/${SEO.slug}/${data.slug}`}
                        passHref
                      >
                        {data.title}
                      </Link>
                    </td>
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
  const getCategories = await fetch(`${process.env.BASE_URL}/categories`);
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
    `${process.env.BASE_URL}/categories/${params.category}`
  );
  const allProductsByCategory = await getProducstByCategory.json();
  const tableData = allProductsByCategory?.products;

  const title = allProductsByCategory.name;
  const slug = allProductsByCategory.slug;
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
      slug,
      site_name: "toko-kobar",
    },
    twitter: {
      card: "summary_large_image",
      site: "@toko-kobar",
      title,
      slug,
    },
  };

  return {
    props: {
      tableData,
      SEO,
    },
  };
}

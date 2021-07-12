import React from "react";
import Layout from "@/components/layout";
import { DEFAULT_SEO } from "@/utils/index";

export default function App({ SEO }) {
  return (
    <div className="container-fluid">
      <Layout seoData={SEO}>
        <h1 className="mt-5 pt-5">Selamat Datang di Toko Devi</h1>
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
  const title = "Home";
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
    },
    revalidate: 10, // => mengijinkan proses revalidasi 1x dalam xx seconds
  };
}

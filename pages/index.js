import React, { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { getSeoData, getData } from "@/utils/index";
import dynamic from "next/dynamic";
import Table from "@/components/Table";

// above the fold

const TableDynamic = dynamic(() => import("@/components/Table/dynamic"));
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

// halaman ini ISR (untuk SEO saja) + Client Data Fetching (untuk get producst)

export default function App({ SEO }) {
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  useEffect(() => {
    const getTableData = async () => {
      const tableData = await getData();
      setTableData(tableData);
    };
    getTableData();
  }, []);

  return (
    <div className="container-fluid">
      <Layout seoData={SEO}>
        <button className="btn" onClick={() => setShowTable((prev) => !prev)}>
          Show / Hide
        </button>
        {tableData?.length > 0 && <Table tableData={tableData} />}
        {showTable && tableData?.length > 0 && (
          <TableDynamic tableData={tableData} />
        )}
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">Kiri</div>
            <div className="col-6">Kanan</div>
          </div>
        </div>
        <div id="map" style={{ height: "300px" }}>
          <Map />
        </div>
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
  const SEO = await getSeoData({ id: 1 });

  return {
    props: {
      SEO,
    },
    revalidate: 10, // => mengijinkan proses revalidasi 1x dalam xx seconds
  };
}

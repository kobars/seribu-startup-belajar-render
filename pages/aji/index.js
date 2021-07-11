import React, { Fragment, useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { getData, getSeoData } from "../../utils";

export default function App( {title} ) {
    const Router = useRouter();    
    const [tableData, setTableData] = useState([]);    
    useEffect(() => {
        const getTableData = async () => {
            const tableData = await getData();
            setTableData(tableData);
        };
        getTableData();        
    }, []);

    return (
        <div className="container">
            <h1>Hallo</h1>            
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
                      <Link key={data.categories.id} href={`/aji/${data.categories.id}`} passHref>
                        <tr key={data.id}>
                          <td>{data.title}</td>
                          <td>{data.price}</td>
                          <td>{data.description}</td>                                                  
                        </tr>
                      </Link>
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
    const title = await getSeoData({ id: 0 });
    
    return {
      props: {
        title,
      },
      revalidate: 10, // => mengijinkan proses revalidasi 1x dalam xx seconds
    };
  }
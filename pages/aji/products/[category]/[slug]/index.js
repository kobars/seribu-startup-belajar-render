import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../../components/layout";

export default function Slug() {
  const { query } = useRouter();  
  const slug = query?.slug;  
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getProduct = async () => {              
      const getProduct = await fetch(`http://be-sekolahbeta.herokuapp.com/products/${slug}`);
      const productBySlug = await getProduct.json();                    
      setProduct(productBySlug);
    };      
    if (slug) {
      getProduct();
    }
  }, [slug]);
  console.log("ini product",product)   
  return (
    <div className="container">
      <Layout>
        {product && (
          <Fragment>            
            <h1>Detail Product</h1>
            {console.log("ini product 2",product)}
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Description</th>                  
                </tr>
              </thead>
              <tbody>
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>                                                                               
                  </tr>
              </tbody>
            </table>
          </Fragment>
        )}
      </Layout>
    </div>
  );
}

// export async function getStaticPaths() {
//   const getProducts = await fetch("http://be-sekolahbeta.herokuapp.com/products");
//   const products = await getProducts.json();  
//   const paths = products.map((product) => ({
//     params: { slug: product.slug },
//   }));  
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const getProductBySlug = await fetch(
//     `http://be-sekolahbeta.herokuapp.com/categories/${params.slug}`
//   );
//   const product = await getProductBySlug.json();
//   console.log("ini product",product)

//   const title = product.title;
//   const author = "Toko Kobar";
//   const SEO = {
//     ...DEFAULT_SEO,
//     title,
//     author,
//     openGraph: {
//       type: "website",
//       locale: "id_ID",
//       url: "https://toko-kobar.com",
//       title,
//       site_name: "toko-kobar",
//     },
//     twitter: {
//       card: "summary_large_image",
//       site: "@toko-kobar",
//       title,
//     },
//   };

//   return {
//     props: {
//       product,
//       SEO,
//     },
//   };
// }

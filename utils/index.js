export const getSeoData = async ({ id }) => {
  const resp = await fetch("http://be-sekolahbeta.herokuapp.com/products");
  const data = await resp.json();
  const title = data[id]?.title;
  return title;
};

export const getData = async () => {
  const resp = await fetch("http://be-sekolahbeta.herokuapp.com/products");
  const res = await resp.json();
  const tableData = res.map((data) => ({
    id: data.id,
    title: data.title,
    price: data.price,
    description: data.description,
    category: data.categories[0].slug
  }));
  console.log(tableData)
  return tableData;
};

// export const getProductBySlug = async ({slug}) => {
//   const resp = await fetch(`http://be-sekolahbeta.herokuapp.com/products/${slug}`);
//   const product = await resp.json();  
//   return product;
// }

export const getCategories = async () => {
  const resp = await fetch("http://be-sekolahbeta.herokuapp.com/categories");
  const res = await resp.json();
  const tableData = res.map((data) => ({
    id: data.id,
    name: data.name,
    slug: data.slug
  }));
  return tableData
}

export const DEFAULT_SEO = {
  title: "Kemenparekraf",
  description:
    "Kementerian Pariwisata dan Ekonomi Kreatif/Badan Pariwisata dan Ekonomi Kreatif Republik Indonesia",
  // keywords: "kemenparekraf",
  author: "kemenpar",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.kemenparekraf.id",
    title: "Kemenparekraf/Baparekraf",
    description:
      "Kementerian Pariwisata dan Ekonomi Kreatif/Badan Pariwisata dan Ekonomi Kreatif Republik Indonesia",
    image:
      "https://s3-kemenparekraf.s3.ap-southeast-1.amazonaws.com/c5f5666986b999be278ad2e66f2da724_646d5d9253.png",
    site_name: "Kemenparekraf",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Kemenparekraf",
    title: "Kemenparekraf/Bapakrekraf Website Republik Indonesia",
    description:
      "Kementerian Pariwisata dan Ekonomi Kreatif/Badan Pariwisata dan Ekonomi Kreatif Republik Indonesia",
    image:
      "https://s3-kemenparekraf.s3.ap-southeast-1.amazonaws.com/c5f5666986b999be278ad2e66f2da724_646d5d9253.png",
  },
};

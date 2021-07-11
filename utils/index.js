export const getSeoData = async ({ id }) => {
  const resp = await fetch("http://localhost:1337/products");
  const data = await resp.json();
  const title = data[id]?.title;
  return title;
};

export const getData = async () => {
  const resp = await fetch("http://localhost:1337/products");
  const res = await resp.json();
  const tableData = res.map((data) => ({
    id: data.id,
    title: data.title,
    price: data.price,
    description: data.description,
    categories: data.categories[0]
  }));
  console.log(tableData)
  return tableData;
};

export const getSeoCategories = async ({ id }) => {
  const resp = await fetch("http://localhost:1337/categories");
  const data = await resp.json();
  const title = data[id]?.name;
  return title;
};

export const getCategoryById = async ({id}) => {
  const resp = await fetch("http://localhost:1337/categories/${id}");
  const res = await resp.json();
  return res;
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

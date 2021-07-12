export const getSeoData = async ({ id }) => {
  // const resp = await fetch("http://localhost:1337/products");
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`);
  const data = await resp.json();
  // console.log("data", data[id]);
  const { title, description, image } = data[id];
  const author = "Toko Kobar";
  const SEO = {
    title,
    description,
    author,
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: "https://toko-kobar.com",
      title,
      description,
      image: `${process.env.NEXT_PUBLIC_BASE_URL}${image.url}`,
      site_name: "toko-kobar",
    },
    twitter: {
      card: "summary_large_image",
      site: "@toko-kobar",
      title,
      description,
      image: `${process.env.NEXT_PUBLIC_BASE_URL}${image.url}`,
    },
  };
  return SEO;
};

export const getData = async () => {
  // const resp = await fetch("http://localhost:1337/products");
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`);
  const res = await resp.json();
  const tableData = res.map((data) => ({
    id: data.id,
    title: data.title,
    price: data.price,
    description: data.description,
  }));
  return tableData;
};

export const DEFAULT_SEO = {
  title: "Kemenparekraf",
  description: "Ini default description",
  // keywords: "kemenparekraf",
  author: "kobar",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.default.id",
    title: "Default OG title",
    description: "Ini default OG description",
    image:
      "https://s3-kemenparekraf.s3.ap-southeast-1.amazonaws.com/c5f5666986b999be278ad2e66f2da724_646d5d9253.png",
    site_name: "Kemenparekraf",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Kemenparekraf",
    title: "Default Twitter Title",
    description: "Ini default twitter description",
    image:
      "https://s3-kemenparekraf.s3.ap-southeast-1.amazonaws.com/c5f5666986b999be278ad2e66f2da724_646d5d9253.png",
  },
};

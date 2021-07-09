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
  }));
  return tableData;
};

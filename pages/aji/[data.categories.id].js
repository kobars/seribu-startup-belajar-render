import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCategoryById } from "../../utils";

export default function Firaz() {
  const [categoryName, setCategoryName] = useState("None");
  const { query } = useRouter();
  const id = query?.data.categories.id;
  console.log("query", query);
  useEffect(() => {
    const getCategories = async () => {
      const resp = await getCategoryById({ id: 0 });
      const data = await resp.json();
      console.log("data", data);
      // const { name } = data;
      // setPokemonName(name);
    };
    if (id) {
      // handle ketika id undefined
      getCategories();
    }
  }, [id]);
  return "";
}

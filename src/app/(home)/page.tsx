import { Hero } from "@/components/common/Hero";
import { CategoryList } from "@/components/common/CategoryList";
import ProductList from "@/components/common/ProductList";

async function getProducts() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(`Terjadi kesalahan ${error}`);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();
  return (
    <div className="flex flex-col ">
      <Hero />
      <CategoryList />
      <ProductList products={products} />
    </div>
  );
}

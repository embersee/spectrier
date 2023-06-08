import { getCategories } from "@/app/dashboard/actions";
import CreateProductForm from "@/components/createProduct";

export default async function EditProductFormPage() {
  const categories = await getCategories();
  return <CreateProductForm categories={categories} />;
}

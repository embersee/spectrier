import { getCategories, getProduct } from "@/app/dashboard/actions";
import EditProductForm from "@/components/editProduct";

interface EditProductFormPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductFormPage({
  params,
}: EditProductFormPageProps) {
  const res = await getProduct(Number(params.id));
  const categories = await getCategories();
  return <EditProductForm defaultValues={res} categories={categories} />;
}

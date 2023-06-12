import { getCategories, getProduct } from "@/app/dashboard/products/actions";
import EditProductForm from "@/app/dashboard/products/edit-product";

interface EditProductModalProps {
  params: {
    id: string;
  };
}

const EditProductModal = async ({ params }: EditProductModalProps) => {
  const res = await getProduct(Number(params.id));
  const categories = await getCategories();
  return <EditProductForm defaultValues={res} categories={categories} />;
};

export default EditProductModal;

import { getCategories, getProduct } from "@/app/dashboard/products/actions";
import CreateProductForm from "@/app/dashboard/products/create-product";

const CreateProductModal = async () => {
  const categories = await getCategories();
  return <CreateProductForm categories={categories} />;
};

export default CreateProductModal;

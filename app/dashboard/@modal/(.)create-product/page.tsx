import { getCategories, getProduct } from "@/app/dashboard/actions";
import CreateProductForm from "@/app/dashboard/create-product";

const CreateProductModal = async () => {
  const categories = await getCategories();
  return <CreateProductForm categories={categories} />;
};

export default CreateProductModal;

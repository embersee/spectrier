import { getCategories } from "@/app/dashboard/products/actions";
import CreateProductForm from "@/components/create-product";

const CreateModal = async () => {
  const categories = await getCategories();
  return <CreateProductForm categories={categories} />;
};

export default CreateModal;

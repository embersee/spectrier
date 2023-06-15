import { getCategories } from "@/app/dashboard/products/actions";
import CreateProductForm from "@/components/create-product";

const CreatePage = async () => {
  const categories = await getCategories();
  return <CreateProductForm categories={categories} />;
};

export default CreatePage;

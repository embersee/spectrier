"use server";

import { getCategories, getProduct } from "@/app/dashboard/actions";
import CreateProductForm from "@/components/createProduct";

const EditProductFormModal = async () => {
  const categories = await getCategories();
  return <CreateProductForm categories={categories} />;
};

export default EditProductFormModal;

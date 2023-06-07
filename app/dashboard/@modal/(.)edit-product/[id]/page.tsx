"use server";

import { getCategories, getProduct } from "@/app/dashboard/actions";
import EditProductForm from "@/components/editProduct";

interface EditProductFormModalProps {
  params: {
    id: string;
  };
}

const EditProductFormModal = async ({ params }: EditProductFormModalProps) => {
  const res = await getProduct(Number(params.id));
  const categories = await getCategories();
  return <EditProductForm defaultValues={res} categories={categories} />;
};

export default EditProductFormModal;

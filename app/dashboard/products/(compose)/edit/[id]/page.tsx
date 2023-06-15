"use server";

import { getCategories, getProduct } from "@/app/dashboard/products/actions";
import EditForm from "@/components/edit-product";

interface EditModalProps {
  params: {
    id: string;
  };
}

const EditModal = async ({ params }: EditModalProps) => {
  const product = await getProduct(Number(params.id));
  const categories = await getCategories();
  return <EditForm defaultValues={product} categories={categories} />;
};

export default EditModal;

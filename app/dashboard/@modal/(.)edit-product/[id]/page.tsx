"use server";

import { getProduct } from "@/app/dashboard/actions";
import EditProductForm from "@/components/editProduct";

interface EditProductFormModalProps {
  params: {
    id: string;
  };
}

const EditProductFormModal = async ({ params }: EditProductFormModalProps) => {
  const res = await getProduct(Number(params.id));
  return <EditProductForm {...res} />;
};

export default EditProductFormModal;

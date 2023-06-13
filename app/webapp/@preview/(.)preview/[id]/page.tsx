import { getProduct } from "@/app/dashboard/products/actions";
import PreviewItem from "@/app/webapp/preview-item";
import { db } from "@/lib/db";
import { Category, Product } from "@/lib/db/schema";

interface PreviewModalProps {
  params: {
    id: string;
  };
}

export default async function PreviewModal({ params }: PreviewModalProps) {
  const { id } = params;

  const product = await getProduct(Number(id));

  return <PreviewItem product={product} />;
}

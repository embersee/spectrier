import { getProduct } from "@/app/dashboard/products/actions";
import PreviewItem from "@/components/preview-item";

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

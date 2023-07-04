import { getProduct } from "@/app/dashboard/products/actions";
import PreviewItem from "@/components/preview-item";
import PreviewItemKZ from "@/components/preview-item-kz";

interface PreviewModalProps {
  params: {
    id: string;
  };
}

export default async function PreviewModal({ params }: PreviewModalProps) {
  const { id } = params;

  const product = await getProduct(Number(id));

  return <PreviewItemKZ product={product} />;
}

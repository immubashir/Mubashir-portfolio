import { notFound } from "next/navigation";
import { getLabBySlug } from "@/content/labs";
import LabDetailClient from "@/components/LabDetailClient";

export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lab = getLabBySlug(slug);

  if (!lab) {
    notFound();
  }

  return <LabDetailClient lab={lab} />;
}
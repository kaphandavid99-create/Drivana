import CarDetailClient from "./CarDetailClient";

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Server Component: params is async in Next.js 15+
  const resolvedParams = await params;
  return <CarDetailClient carId={resolvedParams.id} />;
}

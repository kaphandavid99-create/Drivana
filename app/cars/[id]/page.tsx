import CarDetailClient from "./CarDetailClient";

export default function CarDetailPage({ params }: { params: { id: string } }) {
  // Server Component: safe to read params here
  return <CarDetailClient carId={params.id} />;
}

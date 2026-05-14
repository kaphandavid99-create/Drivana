import AdminSidebar from "./components/AdminSidebar";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: "Drivana Admin Dashboard",
  description: "Admin dashboard for managing Drivana website",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <div className="flex h-screen bg-gray-900 text-white">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 pt-28">
            {children}
          </div>
        </main>
      </div>
    </ClerkProvider>
  );
}

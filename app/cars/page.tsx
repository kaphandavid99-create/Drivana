import { Suspense } from "react";
import CarsPageClient from "./CarsPageClient";

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
          <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
            ))}
          </div>
        </div>
      </div>
    </div>}>
      <CarsPageClient />
    </Suspense>
  );
}
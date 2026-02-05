import { Suspense } from "react";
import { MetricsSkeleton } from "@/components/dashboard/metrics-skeleton";
import { ActivitySkeleton } from "@/components/dashboard/activity-skeleton";
import { MetricsBar } from "@/components/dashboard/metrics-bar";
import { ActivityList } from "@/components/dashboard/activity-list";
import { SearchBar } from "@/components/dashboard/search-bar";
import { CategoryFilter } from "@/components/dashboard/category-filter";
import { ActivityCount } from "@/components/dashboard/activity-count";
import { ActivityCountSkeleton } from "@/components/dashboard/activity-count-skeleton";
import type { SearchParams } from "@/lib/types";

interface HomeProps {
  searchParams: Promise<SearchParams>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
      <div className="space-y-6 sm:space-y-10">
        <section aria-labelledby="system-health-heading">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div
              className="w-1 h-7 bg-blue-500 rounded-full"
              aria-hidden="true"
            ></div>
            <h2
              id="system-health-heading"
              className="text-xl sm:text-2xl font-semibold text-gray-900"
            >
              System Health
            </h2>
          </div>
          <Suspense fallback={<MetricsSkeleton />}>
            <MetricsBar />
          </Suspense>
        </section>

        <section aria-labelledby="recent-activities-heading">
          <div className="mb-4 sm:mb-6 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3">
              <div
                className="w-1 h-7 bg-green-500 rounded-full"
                aria-hidden="true"
              ></div>
              <div className="flex items-center">
                <h2
                  id="recent-activities-heading"
                  className="text-xl sm:text-2xl font-semibold text-gray-900"
                >
                  Recent Activities
                </h2>
                <Suspense fallback={<ActivityCountSkeleton />}>
                  <ActivityCount searchParams={params} />
                </Suspense>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <SearchBar />
              </div>
              <div>
                <CategoryFilter />
              </div>
            </div>
          </div>
          <Suspense fallback={<ActivitySkeleton />}>
            <ActivityList searchParams={params} />
          </Suspense>
        </section>
      </div>
    </div>
  );
}

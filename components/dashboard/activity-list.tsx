import { getActivities } from "@/lib/data";
import dynamic from "next/dynamic";
const ActivityItem = dynamic(() =>
  import("./activity-item").then((mod) => mod.ActivityItem),
);
import type { SearchParams } from "@/lib/types";

interface ActivityListProps {
  searchParams: SearchParams;
}

export async function ActivityList({ searchParams }: ActivityListProps) {
  const activities = await getActivities(
    searchParams.search,
    searchParams.category,
  );

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">
          No activities found
        </h3>
        <p className="text-sm text-gray-600">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          priority={index < 5}
        />
      ))}
    </div>
  );
}

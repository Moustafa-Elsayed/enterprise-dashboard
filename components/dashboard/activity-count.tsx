import { getActivitiesCount } from "@/lib/data";
import type { SearchParams } from "@/lib/types";

interface ActivityCountProps {
  searchParams: SearchParams;
}

export async function ActivityCount({ searchParams }: ActivityCountProps) {
  const count = await getActivitiesCount(
    searchParams.search,
    searchParams.category,
  );

  return (
    <span className="ml-2 px-2.5 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
      {count}
    </span>
  );
}

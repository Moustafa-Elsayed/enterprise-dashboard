import mockData from "./mock-data.json";
import type { MetricsData, Activity, MockData } from "./types";

const data: MockData = mockData as MockData;

const activities = [...data.activities];

import { unstable_cache } from "next/cache";

export const getMetrics = unstable_cache(
  async (): Promise<MetricsData> => {
    return data.metrics;
  },
  ["metrics-data"],
  { tags: ["metrics"], revalidate: 60 },
);

export const getActivities = unstable_cache(
  async (search?: string, category?: string): Promise<Activity[]> => {
    let filtered = activities.filter((activity) => !activity.dismissed);

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (activity) =>
          activity.title.toLowerCase().includes(searchLower) ||
          activity.description.toLowerCase().includes(searchLower),
      );
    }

    if (category && category !== "all") {
      filtered = filtered.filter((activity) => activity.category === category);
    }

    return filtered.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  },
  ["activities-data"],
  { tags: ["activities"], revalidate: 60 },
);

export const getActivitiesCount = unstable_cache(
  async (search?: string, category?: string): Promise<number> => {
    let filtered = activities.filter((activity) => !activity.dismissed);

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (activity) =>
          activity.title.toLowerCase().includes(searchLower) ||
          activity.description.toLowerCase().includes(searchLower),
      );
    }

    if (category && category !== "all") {
      filtered = filtered.filter((activity) => activity.category === category);
    }

    return filtered.length;
  },
  ["activities-count"],
  { tags: ["activities"], revalidate: 60 },
);

export async function dismissActivity(id: string): Promise<void> {
  const activity = activities.find((a) => a.id === id);
  if (activity) {
    activity.dismissed = true;
  }
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

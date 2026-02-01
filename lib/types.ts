export type ActivityStatus = "active" | "completed" | "warning" | "error";

export type ActivityCategory =
  | "security"
  | "performance"
  | "deployment"
  | "system";

export interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: "healthy" | "warning" | "critical";
  trend: "up" | "down" | "stable";
  change: number;
}

export interface MetricsData {
  cpu: SystemMetric;
  memory: SystemMetric;
  disk: SystemMetric;
  network: SystemMetric;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  status: ActivityStatus;
  category: ActivityCategory;
  timestamp: string;
  user: {
    name: string;
    avatar: string;
  };
  dismissed?: boolean;
}

export interface MockData {
  metrics: MetricsData;
  activities: Activity[];
}

export interface SearchParams {
  search?: string;
  category?: string;
}

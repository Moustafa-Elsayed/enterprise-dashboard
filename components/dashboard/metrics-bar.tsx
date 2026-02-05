import { getMetrics } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react";

export async function MetricsBar() {
  const metrics = await getMetrics();

  const metricsArray = [
    metrics.cpu,
    metrics.memory,
    metrics.disk,
    metrics.network,
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "healthy":
        return "success";
      case "warning":
        return "warning";
      case "critical":
        return "error";
      default:
        return "info";
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") {
      return <ArrowUp className="w-4 h-4" />;
    }
    if (trend === "down") {
      return <ArrowDown className="w-4 h-4" />;
    }
    return <ArrowRight className="w-4 h-4" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
      {metricsArray.map((metric) => (
        <div
          key={metric.name}
          className="group relative bg-linear-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-lg transition-all duration-300 p-4 sm:p-6 overflow-hidden hover:scale-[1.02] hover:border-blue-300"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl -z-0 transition-transform duration-500" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {metric.name}
              </h3>
              <Badge variant={getStatusVariant(metric.status)}>
                {metric.status}
              </Badge>
            </div>

            <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
              <span className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {metric.value}
              </span>
              <span className="text-sm font-medium text-gray-500">
                {metric.unit}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all duration-200 ${
                    metric.trend === "up"
                      ? "bg-linear-to-r from-red-50 to-rose-100 text-red-700 border border-red-200"
                      : metric.trend === "down"
                        ? "bg-linear-to-r from-green-50 to-emerald-100 text-green-700 border border-green-200"
                        : "bg-linear-to-r from-gray-50 to-slate-100 text-gray-700 border border-gray-200"
                  }`}
                >
                  <span className="text-base font-bold leading-none">
                    {getTrendIcon(metric.trend)}
                  </span>
                  <span className="font-bold">{Math.abs(metric.change)}%</span>
                </span>
              </div>
              <span className="text-xs text-gray-500 font-medium">
                vs last hour
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

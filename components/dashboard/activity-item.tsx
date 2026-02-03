"use client";

import { useOptimistic, useTransition, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/data";
import { dismissActivityAction } from "@/app/actions/dismiss-activity";
import type { Activity } from "@/lib/types";

interface ActivityItemProps {
  activity: Activity;
  priority?: boolean;
}

export function ActivityItem({
  activity,
  priority = false,
}: ActivityItemProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [optimisticActivity, setOptimisticActivity] = useOptimistic(
    activity,
    (state, dismissed: boolean) => ({ ...state, dismissed }),
  );

  const handleDismiss = () => {
    startTransition(() => {
      setError(null);
      setOptimisticActivity(true);

      dismissActivityAction(activity.id).then((result) => {
        if (!result.success) {
          setError(result.error || "Failed to dismiss activity");
          setOptimisticActivity(false);
        }
      });
    });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "warning":
        return "warning";
      case "error":
        return "error";
      case "active":
        return "info";
      default:
        return "info";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "security":
        return "text-red-700 bg-red-50 border-red-200";
      case "performance":
        return "text-amber-700 bg-amber-50 border-amber-200";
      case "deployment":
        return "text-blue-700 bg-blue-50 border-blue-200";
      case "system":
        return "text-slate-700 bg-slate-50 border-slate-200";
      default:
        return "text-slate-700 bg-slate-50 border-slate-200";
    }
  };

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-l-emerald-500";
      case "warning":
        return "border-l-amber-500";
      case "error":
        return "border-l-rose-500";
      case "active":
        return "border-l-blue-500";
      default:
        return "border-l-slate-300";
    }
  };

  if (optimisticActivity.dismissed) {
    return null;
  }

  return (
    <div
      className={`group relative bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-gray-300/80 transition-all duration-300 overflow-hidden ${getStatusBorderColor(activity.status)} border-l-4`}
      style={{ contentVisibility: "auto", contain: "content" }}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <Image
              src={activity.user.avatar}
              alt={activity.user.name}
              width={48}
              height={48}
              className="rounded-full ring-2 ring-gray-100 group-hover:ring-gray-200 transition-all duration-300"
              style={{ width: "48px", height: "48px", objectFit: "cover" }}
              loading={priority ? "eager" : "lazy"}
              priority={priority}
              sizes="48px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 truncate mb-1 group-hover:text-gray-700 transition-colors">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {activity.description}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={getStatusVariant(activity.status)}>
                  {activity.status}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  loading={isPending}
                  disabled={isPending}
                  className="transition-opacity duration-200 cursor-pointer"
                >
                  Dismiss
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-900">
                  {activity.user.name}
                </span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">
                {formatDate(activity.timestamp)}
              </span>
              <span className="text-gray-300">•</span>
              <span
                className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getCategoryColor(activity.category)}`}
              >
                {activity.category}
              </span>
            </div>

            {error && (
              <div className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-lg flex items-center gap-2">
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

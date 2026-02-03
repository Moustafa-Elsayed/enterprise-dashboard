import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info";
  className?: string;
}

export function Badge({
  children,
  variant = "info",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    success: "bg-emerald-50 text-emerald-700 border border-emerald-600",
    warning: "bg-amber-50 text-amber-700 border border-amber-600",
    error: "bg-rose-50 text-rose-700 border border-rose-600",
    info: "bg-blue-50 text-blue-700 border border-blue-600",
  };

  return (
    <span
      className={`inline-flex justify-center items-center gap-1.5 px-2 py-1 rounded-md text-sm font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

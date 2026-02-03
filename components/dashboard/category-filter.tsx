"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

const categories = [
  { id: "all", label: "All" },
  { id: "security", label: "Security" },
  { id: "performance", label: "Performance" },
  { id: "deployment", label: "Deployment" },
  { id: "system", label: "System" },
];

export function CategoryFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const activeCategory = searchParams.get("category") || "all";

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);

    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.id)}
          disabled={isPending}
          className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeCategory === category.id
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

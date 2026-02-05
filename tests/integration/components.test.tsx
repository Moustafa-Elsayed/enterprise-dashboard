import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { CategoryFilter } from "@/components/dashboard/category-filter";

const pushMock = vi.fn();
let mockCategoryParam: string | null = null;

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === "category") return mockCategoryParam;
      return null;
    },
    [Symbol.iterator]: function* () {
      if (mockCategoryParam) yield ["category", mockCategoryParam];
    },
    entries: function* () {
      if (mockCategoryParam) yield ["category", mockCategoryParam];
    },
  }),
  usePathname: () => "/",
}));

describe("CategoryFilter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCategoryParam = null;
    cleanup();
  });

  it("renders all category buttons", () => {
    render(<CategoryFilter />);

    expect(screen.getByText("All")).toBeDefined();
    expect(screen.getByText("Security")).toBeDefined();
    expect(screen.getByText("Performance")).toBeDefined();
  });

  it("updates URL when category is clicked", () => {
    render(<CategoryFilter />);

    const securityBtn = screen.getByText("Security");
    fireEvent.click(securityBtn);

    expect(pushMock.mock.calls[0][0]).toContain("category=security");
  });

  it("removes category param when clicking All", () => {
    mockCategoryParam = "security";
    render(<CategoryFilter />);

    const allBtn = screen.getByText("All");
    fireEvent.click(allBtn);

    const calledUrl = pushMock.mock.calls[0][0];
    const isCleanUrl = calledUrl === "/?" || calledUrl === "/";
    expect(isCleanUrl).toBe(true);
  });
});

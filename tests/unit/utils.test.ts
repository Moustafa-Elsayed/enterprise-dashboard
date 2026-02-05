import { describe, it, expect } from "vitest";
import { formatDate } from "@/lib/data";

describe("formatDate", () => {
  it('should return "just now" for very recent dates', () => {
    const now = new Date();
    expect(formatDate(now)).toBe("just now");
  });

  it("should format minutes ago correctly", () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    expect(formatDate(fiveMinutesAgo)).toBe("5 minutes ago");
  });

  it("should format single minute correctly", () => {
    const oneMinuteAgo = new Date(Date.now() - 1 * 60 * 1000);
    expect(formatDate(oneMinuteAgo)).toBe("1 minute ago");
  });

  it("should format hours ago correctly", () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    expect(formatDate(twoHoursAgo)).toBe("2 hours ago");
  });

  it("should format single hour correctly", () => {
    const oneHourAgo = new Date(Date.now() - 1 * 60 * 60 * 1000);
    expect(formatDate(oneHourAgo)).toBe("1 hour ago");
  });

  it("should format days ago correctly", () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    expect(formatDate(threeDaysAgo)).toBe("3 days ago");
  });

  it("should format old dates as absolute dates", () => {
    const oldDate = new Date("2024-01-15");
    const result = formatDate(oldDate);
    expect(result).toMatch(/Jan/);
    expect(result).toMatch(/15/);
  });

  it("should handle string dates", () => {
    const dateString = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    expect(formatDate(dateString)).toBe("30 minutes ago");
  });
});

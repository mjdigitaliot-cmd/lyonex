import { describe, expect, it } from "vitest";

import { assertPermission, hasPermission } from "@/lib/permissions";

describe("permission matrix", () => {
  it("allows super admin everywhere", () => {
    expect(hasPermission("SUPER_ADMIN", "orders.update")).toBe(true);
    expect(hasPermission("SUPER_ADMIN", "inventory.update")).toBe(true);
  });

  it("prevents customer from admin actions", () => {
    expect(hasPermission("CUSTOMER", "orders.update")).toBe(false);
  });

  it("throws forbidden when assert fails", () => {
    expect(() => assertPermission("CUSTOMER", "inventory.update")).toThrow("FORBIDDEN");
  });
});

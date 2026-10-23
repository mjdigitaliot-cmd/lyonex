export type AppRole =
  | "SUPER_ADMIN"
  | "ORDER_MANAGER"
  | "INVENTORY_MANAGER"
  | "SUPPORT_AGENT"
  | "CUSTOMER";

const rolePermissions: Record<AppRole, string[]> = {
  SUPER_ADMIN: ["*"],
  ORDER_MANAGER: [
    "orders.read",
    "orders.update",
    "returns.update",
    "cod.collection.record",
    "customers.read"
  ],
  INVENTORY_MANAGER: [
    "products.read",
    "products.create",
    "products.update",
    "inventory.read",
    "inventory.update"
  ],
  SUPPORT_AGENT: [
    "tickets.read",
    "tickets.update",
    "orders.read",
    "customers.read",
    "reviews.moderate"
  ],
  CUSTOMER: ["self.read", "self.update"]
};

export function hasPermission(role: AppRole, permission: string): boolean {
  const permissions = rolePermissions[role] ?? [];
  return permissions.includes("*") || permissions.includes(permission);
}

export function assertPermission(role: AppRole, permission: string): void {
  if (!hasPermission(role, permission)) {
    throw new Error("FORBIDDEN");
  }
}

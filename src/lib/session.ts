import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AppRole } from "@/lib/permissions";

export async function getAppSession() {
  return getServerSession(authOptions);
}

export async function requireRole(allowed: AppRole[]) {
  const session = await getAppSession();
  const role = (session?.user as any)?.role as AppRole | undefined;

  if (!session || !role || !allowed.includes(role)) {
    const err = new Error("UNAUTHORIZED");
    (err as any).status = 401;
    throw err;
  }

  return { session, role };
}

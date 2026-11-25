import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { ApiError } from "@/lib/api";
import {
  clearOwnerSession,
  fetchOwnerMe,
  getOwnerSession,
  getToken,
} from "@/lib/owner-auth";
import { OwnerGuardSkeleton } from "./components/skeletons";

export default function OwnerGuard() {
  const [ready, setReady] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const hasLocal = Boolean(getOwnerSession() && getToken());
      if (!hasLocal) {
        if (!cancelled) {
          setOk(false);
          setReady(true);
        }
        return;
      }

      try {
        await fetchOwnerMe();
        if (!cancelled) setOk(true);
      } catch (e) {
        // Only force logout on auth failure — keep session on transient DB/network errors
        if (e instanceof ApiError && (e.status === 401 || e.status === 403)) {
          clearOwnerSession();
          if (!cancelled) setOk(false);
        } else if (!cancelled) {
          setOk(true);
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    void check();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) return <OwnerGuardSkeleton />;
  if (!ok) return <Navigate to="/signin" replace />;
  return <Outlet />;
}

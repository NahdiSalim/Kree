import { useEffect, useState } from "react";
import { apiFetch } from "./api";

export interface OwnerSession {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  company?: string;
  bio?: string;
  avatar?: string;
}

const SESSION_KEY = "kree_owner_session";
const TOKEN_KEY = "kree_owner_token";

type ApiOwner = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  city: string | null;
  company: string | null;
  bio: string | null;
  avatarUrl: string | null;
};

function mapOwner(owner: ApiOwner): OwnerSession {
  return {
    id: owner.id,
    name: owner.name,
    email: owner.email,
    phone: owner.phone || undefined,
    city: owner.city || undefined,
    company: owner.company || undefined,
    bio: owner.bio || undefined,
    avatar: owner.avatarUrl || undefined,
  };
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getOwnerSession(): OwnerSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OwnerSession;
    if (!parsed?.email || !parsed?.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setOwnerSession(session: OwnerSession, token?: string) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  if (token) localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event("kree-owner-updated"));
}

export function updateOwnerSession(patch: Partial<OwnerSession>) {
  const current = getOwnerSession();
  if (!current) return null;
  const next = { ...current, ...patch };
  setOwnerSession(next);
  return next;
}

export function clearOwnerSession() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event("kree-owner-updated"));
}

export function isOwnerLoggedIn() {
  return Boolean(getOwnerSession() && getToken());
}

export async function signupOwner(input: {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
}) {
  const data = await apiFetch<{ token: string; owner: ApiOwner }>(
    "/api/auth/signup",
    { method: "POST", body: JSON.stringify(input) },
  );
  setOwnerSession(mapOwner(data.owner), data.token);
  return data;
}

export async function signinOwner(input: { email: string; password: string }) {
  const data = await apiFetch<{ token: string; owner: ApiOwner }>(
    "/api/auth/signin",
    { method: "POST", body: JSON.stringify(input) },
  );
  setOwnerSession(mapOwner(data.owner), data.token);
  return data;
}

export async function fetchOwnerMe() {
  const token = getToken();
  if (!token) return null;
  const data = await apiFetch<{ owner: ApiOwner }>("/api/auth/me", { token });
  const session = mapOwner(data.owner);
  setOwnerSession(session, token);
  return session;
}

export async function patchOwnerProfile(
  patch: Partial<{
    name: string;
    phone: string | null;
    city: string | null;
    company: string | null;
    bio: string | null;
    avatarUrl: string | null;
  }>,
) {
  const token = getToken();
  if (!token) throw new Error("Non authentifié");
  const data = await apiFetch<{ owner: ApiOwner }>("/api/auth/me", {
    method: "PATCH",
    token,
    body: JSON.stringify(patch),
  });
  const session = mapOwner(data.owner);
  setOwnerSession(session, token);
  return session;
}

export function useOwnerSession() {
  const [session, setSession] = useState<OwnerSession | null>(() =>
    typeof window === "undefined" ? null : getOwnerSession(),
  );

  useEffect(() => {
    const load = () => setSession(getOwnerSession());
    load();
    window.addEventListener("kree-owner-updated", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("kree-owner-updated", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  return session;
}

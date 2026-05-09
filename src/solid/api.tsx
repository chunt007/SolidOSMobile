import { SolidSession } from "./session";

export async function solidFetch(
  session: SolidSession,
  url: string,
  options: RequestInit = {}
) {
  const headers = new Headers(options.headers || {});
  if (session.cookies) {
    headers.set("Cookie", session.cookies);
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
}

export async function fetchWithoutRefresh(
  url: string,
  options: RequestInit = {}
) {
  const opts: RequestInit = {
    ...options,
    headers: {
      ...(options.body && { "Content-Type": "application/json" }),
      ...(options.headers ?? {}),
    },
  };
  return fetch(url, opts);
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildURL(
  baseUrl: string,
  path: string,
  query?: Record<string, string | number | boolean>,
) {
  const url = new URL(path, baseUrl);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
  }
  return url;
}

/**
 * Creates the URL using configured BACKEND_URL value as base URL, if BACKEND_URL not configured, default baseUrl is used.
 * which is http://127.0.0.1:8000
 * @param path - the URL path
 * @param query - query parameters object
 * @returns complete URL string
 */
export function buildURLWithBase(
  path: string,
  query?: Record<string, string | number | boolean>,
) {
  let backend_base_url = process.env.BACKEND_URL;

  if (!backend_base_url) {
    console.error("BACKEND_URL not configured. Using default one.\n");
    backend_base_url = "http://127.0.0.1:8000";
  }

  path = "/api" + path;
  return buildURL(backend_base_url, path, query).toString();
}

export const formatNumber = (number: number | undefined) => {
  if (number === undefined) {
    return 0;
  }
  if (isNaN(number)) {
    return 0;
  }
  return Intl.NumberFormat().format(number);
};

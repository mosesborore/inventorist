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
 * Creates the URL with a default baseUrl
 * @param path
 * @param query
 * @returns complete URL string
 */
export function buildURLWithBase(
  path: string,
  query?: Record<string, string | number | boolean>,
) {
  path = "/api" + path;
  return buildURL("http://127.0.0.1:8000", path, query).toString();
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

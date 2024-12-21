import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { REDIRECT_PATH_PARAM } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateLinkWithRedirectTo(
  link: string,
  redirectTo?: string | null
) {
  if (!redirectTo) {
    return link;
  }
  return `${link}?${REDIRECT_PATH_PARAM}=${redirectTo}`;
}

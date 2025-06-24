import { clsx } from "clsx";
import { Github, Mail } from "lucide-react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const formatTime = (date, config = null) => {
  const today = date.toLocaleDateString(undefined, config ? config : {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return today
}


export const formatFileSize = (kb, decimals = 2) => {
  if (kb === 0) return '0 KB';

  const sizes = ['KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(kb) / Math.log(1024));
  const size = kb / Math.pow(1024, i);

  return `${parseFloat(size.toFixed(decimals))} ${sizes[i]}`;
}

export const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // in seconds

  if (isNaN(diff) || diff < 0) return "just now";

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} minute(s) ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour(s) ago`;
  if (diff < 172800) return "yesterday";
  if (diff < 2592000) return `${Math.floor(diff / 86400)} day(s) ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} month(s) ago`;
  return `${Math.floor(diff / 31536000)} year(s) ago`;
}

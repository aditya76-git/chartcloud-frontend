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

export const toCamelCase = (text) => {
  if (typeof text !== 'string') return text;

  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
}

export const camelToLabel = (camelCase) => {
  return camelCase
    .replace(/([A-Z])/g, ' $1')     // Add space before capital letters
    .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
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

  if (isNaN(diff) || diff < 0 || diff < 60) {
    return { value: 0, unit: "just" };
  }

  if (diff < 3600) {
    return { value: Math.floor(diff / 60), unit: "minutes" };
  }

  if (diff < 86400) {
    return { value: Math.floor(diff / 3600), unit: "hours" };
  }

  if (diff < 172800) {
    return { value: 1, unit: "day" }; // "yesterday"
  }

  if (diff < 2592000) {
    return { value: Math.floor(diff / 86400), unit: "days" };
  }

  if (diff < 31536000) {
    return { value: Math.floor(diff / 2592000), unit: "months" };
  }

  return { value: Math.floor(diff / 31536000), unit: "years" };
};


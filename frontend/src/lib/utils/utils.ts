import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const colors = new Map([
  ["green", {
    light: "bg-green-100",
    strong: "bg-green-600",
    strongFont: "text-green-600",
  }],
  ["blue", {
    light: "bg-blue-100",
    strong: "bg-blue-600",
    strongFont: "text-blue-600",
  }],
  ["purple", {
    light: "bg-purple-100",
    strong: "bg-purple-600",
    strongFont: "text-purple-600",
  }],
  ["pink", {
    light: "bg-pink-100",
    strong: "bg-pink-600",
    strongFont: "text-pink-600",
  }],
  ["red", {
    light: "bg-red-100",
    strong: "bg-red-600",
    strongFont: "text-red-600",
  }],
  ["orange", {
    light: "bg-orange-100",
    strong: "bg-orange-600",
    strongFont: "text-orange-600",
  }],
  ["yellow", {
    light: "bg-yellow-100",
    strong: "bg-yellow-600",
    strongFont: "text-yellow-600",
  }],
  ["gray", {
    light: "bg-gray-900",
    strong: "bg-gray-600",
    strongFont: "text-gray-600",
  }],
]);

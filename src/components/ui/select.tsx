"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

function Select({ value, onValueChange, children, className }: SelectProps) {
  return (
    <div className={cn("relative", className)}>
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={cn(
          "flex h-9 w-full appearance-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pr-8"
        )}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 opacity-50"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

function SelectItem({ value, children }: SelectItemProps) {
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (React.isValidElement(node) && node.props && typeof node.props === "object" && "children" in node.props) {
      const props = node.props as { children: React.ReactNode };
      const childArray = Array.isArray(props.children) ? props.children : [props.children];
      return childArray.map(getTextContent).join("");
    }
    return "";
  };

  const childArray = React.Children.toArray(children);
  const textContent = childArray.map(getTextContent).join("") || value;

  return <option value={value}>{textContent}</option>;
}

export { Select, SelectItem };

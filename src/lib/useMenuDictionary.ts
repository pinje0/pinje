"use client";

import { useEffect, useState } from "react";

export function useMenuDictionary(locale: string) {
  const [t, setT] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    async function loadDict() {
      let dict: Record<string, unknown>;

      switch (locale) {
        case "id":
          dict = (await import("@/locales/id.json")).default;
          break;
        case "jp":
          dict = (await import("@/locales/jp.json")).default;
          break;
        default:
          dict = (await import("@/locales/en.json")).default;
      }

      setT(dict);
    }

    loadDict();
  }, [locale]);

  return t;
}

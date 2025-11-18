// import en from "@/locales/en.json";
// import id from "@/locales/id.json";
// import jp from "@/locales/jp.json";

export async function getDictionary(locale: string) {
  switch (locale) {
    case "id":
      return (await import("@/locales/id.json")).default;
    case "jp":
      return (await import("@/locales/jp.json")).default;
    default:
      return (await import("@/locales/en.json")).default;
  }
}

import { redirect } from "next/navigation";

export default function RootPage() {
  // default language English
  redirect("/en");
}

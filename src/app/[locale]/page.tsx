import { getDictionary } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">{t.home.title}</h1>
      <p className="text-xl mt-4">{t.home.subtitle}</p>
      <p className="mt-2">{t.home.about}</p>
    </main>
  );
}

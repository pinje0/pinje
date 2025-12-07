import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-white dark:bg-[#09090B] text-black dark:text-white">
        <main className="min-h-screen w-full flex flex-col justify-center items-center text-center select-none px-4">
          <h1 className="mb-8 text-3xl font-semibold">Page not found!</h1>

          <Image
            src="/img/404.png"
            alt="404"
            width={600}
            height={400}
            draggable={false}
            className="pointer-events-none max-w-full h-auto"
          />

          <p className="text-xl mt-6 opacity-80">Sorry, we cannot find the requested page.</p>

          <Link
            href="/en"
            className="mt-8 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-all duration-300 font-medium inline-block"
          >
            ← Back to Home
          </Link>
        </main>
      </body>
    </html>
  );
}

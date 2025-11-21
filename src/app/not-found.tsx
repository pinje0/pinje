import Image from "next/image";

export default function NotFound() {
  return (
    // <main className="w-screen h-screen bg-zinc-900 text-white flex flex-col justify-center items-center text-center select-none">
    <main className="min-h-screen w-full bg-zinc-900 text-white flex flex-col justify-center items-center text-center select-none">
      <h1 className="mb-8 text-3xl font-mono">Page not found!</h1>

      <Image
        src="/img/404.png"
        alt="404"
        width={600}
        height={400}
        draggable={false}
        className="pointer-events-none"
      />

      <p className="text-xl mt-6 font-mono opacity-80">Sorry, we cannot find the requested page.</p>
    </main>
  );
}

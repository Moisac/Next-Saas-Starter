import { Toaster } from "@/components/ui/sonner"

export default function Home() {
  return (
    <>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <h1>NextJs Saas Starter</h1>
        </main>
        <Toaster expand={true} richColors closeButton />
    </>
  );
}

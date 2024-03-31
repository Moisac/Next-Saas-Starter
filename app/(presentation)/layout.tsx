import { Header } from "@/components/layout/header";

export default function PresentationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
     <Header />
     <main className="p-4">
      {children}
     </main>
     <footer className="p-4">Footer</footer>
   </>
  );
}

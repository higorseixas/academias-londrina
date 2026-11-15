import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Academias de Londrina/PR",
  description: "Aplicativo Web para consulta das academias de Londrina/PR — UniFil, Extensão V.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="bg-brand text-white shadow">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <span className="rounded bg-white/15 px-2 py-1 text-sm">🏋️</span>
              <span>Academias · Londrina</span>
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/" className="hover:underline">
                Início
              </Link>
              <Link href="/sobre" className="hover:underline">
                Sobre
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="mt-12 border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-slate-600">
            UniFil · Engenharia de Software · Extensão V · Higor Clem Seixas · 2026
          </div>
        </footer>
      </body>
    </html>
  );
}

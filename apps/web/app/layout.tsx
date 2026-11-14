import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "RF360 - Marketplace de Técnicos de Eletrônica",
    template: "%s | RF360",
  },
  description:
    "Encontre técnicos especializados em reparo de eletrônicos na sua região. Celulares, notebooks, TVs, videogames, tablets e mais. Orçamento rápido via WhatsApp, avaliações verificadas e acompanhamento em tempo real.",
  keywords: [
    "reparo eletrônicos",
    "assistência técnica",
    "conserto celular",
    "reparo notebook",
    "conserto TV",
    "reparo videogame",
    "técnico eletrônica",
    "troca de tela",
  ],
  authors: [{ name: "RF360" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://rf360.com.br",
    siteName: "RF360",
    title: "RF360 - Marketplace de Técnicos de Eletrônica",
    description:
      "Encontre técnicos especializados em reparo de eletrônicos na sua região.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

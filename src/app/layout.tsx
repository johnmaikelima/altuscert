import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CertDigital - Certificados Digitais A1 PJ e A1 PF",
  description: "Emissão de certificados digitais A1 PJ e A1 PF com segurança e rapidez. Preços competitivos e atendimento via WhatsApp.",
  keywords: "certificado digital, A1 PJ, A1 PF, certificado digital PJ, certificado digital PF",
  openGraph: {
    title: "CertDigital - Certificados Digitais A1 PJ e A1 PF",
    description: "Emissão de certificados digitais A1 PJ e A1 PF com segurança e rapidez.",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0066cc" />
        {/* Mercado Pago Checkout Pro */}
        <script src="https://sdk.mercadopago.com/js/v2"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-gray-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

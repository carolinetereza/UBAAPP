import "./globals.css";

export const metadata = {
  title: "UBA APP | MOBILIDADE DE UBATUBA",
  description: "Aonde você for, vá de UBA. O app de mobilidade urbana feito para Ubatuba. Segurança, preço justo e respeito por quem vive e visita a cidade. Em breve!",
  keywords: "UBA APP, Ubatuba, mobilidade urbana, transporte, corrida, motorista, passageiro, app de transporte Ubatuba",
  openGraph: {
    title: "UBA APP — Ubatuba se Movendo",
    description: "Aonde você for, vá de UBA. O app de mobilidade feito para Ubatuba.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#0a1e3d" />
      </head>
      <body>{children}</body>
    </html>
  );
}

import "./globals.css";

export const metadata = {
  title: "بطولاتي | Byoolatu",
  description: "منصة بطولات: إنشاء بطولة، تسجيل لاعبين، إجراء القرعة.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}

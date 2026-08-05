import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
export const metadata = { title: "test" };
export default function RootLayout({ children }) {
  return (<html lang="es"><body className="font-body antialiased"><CustomCursor />{children}</body></html>);
}

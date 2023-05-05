import Header from "@/components/Header/Header";
import "./globals.scss";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  description: "Todo App created in Nextjs 13",
  author: "Pratim Acharya",
};

export default function layout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}

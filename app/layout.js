import Head from "next/head";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Car Selling Service",
  description:
    "Effortlessly sell your car with our reliable and user-friendly car selling service. Submit your vehicle details, upload pictures, and connect with potential buyers seamlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body suppressHydrationWarning={true}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}

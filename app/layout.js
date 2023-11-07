import { Roboto } from "next/font/google";
import { Providers } from "../redux/providers";
import Nav from "./components/Nav/Nav";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";
import HomeSideBar from "./components/HomeSideBar/HomeSideBar";
import "react-toastify/dist/ReactToastify.css";
import Toastify from "./components/Toastify";
import SessionProviders from "./components/SessionProviders";
import DataFetching from "./components/DataFetching";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Full Stack YouTube Clone",
  description: "YouTube Clone by Sairaj Aftab",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Providers>
          <SessionProviders>
            <DataFetching />
            <Toastify />
            <Nav />
            <HomeSideBar />
            <main>{children}</main>
          </SessionProviders>
        </Providers>
      </body>
    </html>
  );
}

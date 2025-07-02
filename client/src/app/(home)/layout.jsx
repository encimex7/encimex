import localFont from "next/font/local";
// import "../globals.css";
import '@/styles/globals.css';
import { Anta } from "next/font/google";
import Footer from "../../components/shared/Footer.jsx";
import Navbar from "../../components/shared/Navbar.jsx";

export const metadata = {
  title: "encimex",
  description: "Company",
};


const AntaFont = Anta({
  variable: "--font-Anta",
  subsets: ["latin"],
  weight:"400"
})

const helvetica = localFont({
  src: [
    {
      path: "../../../public/fonts/HelveticaNeueThin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/fonts/HelveticaNeueUltraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/HelveticaNeueLight.otf",
      weight: "300",
      style: "normal",
    }, 
    {
      path: "../../../public/fonts/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
});

const PPTelegraf = localFont({
  src: [
    {
      path: "../../../public/fonts/PPTelegraf-UltraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/PPTelegraf-Regular.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-PPTelegraf",
});

const helveticanowdisplay = localFont({
  src: [
    {
      path: "../../../public/fonts/HelveticaNowDisplay-LightIta.otf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-helveticanowdisplay",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${helvetica.variable} ${PPTelegraf.variable} ${AntaFont.variable} ${helveticanowdisplay.variable} antialiased `} suppressHydrationWarning>
          <div className="overflow-hidden bg-[#0D0D0D]">
          <Navbar/>
            {children}
            <Footer/>
          </div>
      </body>
    </html>
  );
}

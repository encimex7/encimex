
import "../../styles/globals.css";
import Sidebar from "../../components/admin/sidebar.jsx";


export const metadata = {
  title: "Encimex",
  description: "Engineering solutions for a smarter tomorrow ",
};



export default function AdminLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` min-h-screen antialiased",
        `} suppressHydrationWarning
      >
        <div>
          <Sidebar />
          <div className=" md:ml-16">
            <div className="flex w-full gap-10">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
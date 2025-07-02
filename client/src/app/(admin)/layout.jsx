
import "../../styles/globals.css";
import Sidebar from "../../components/admin/sidebar.jsx";
import { ToastContainer } from 'react-toastify'; // Add this import
import 'react-toastify/dist/ReactToastify.css'; // Add the CSS


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
           <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </body>
    </html>
  );
}
import CartProvider from "@/context/CardContext";
import Navbar from "./components/Navbar";
import "./globals.css"
import {Toaster} from 'react-hot-toast'
import Cart from "./components/Cart";

export const metadata = {
  title: 'Savoy',
  description: 'Buy Anything',
  icons: {
    icon: '/s.png', // Path to your favicon
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        <Toaster position="top-right"/>
        <CartProvider>
        <Cart/>
        {children}
        </CartProvider>
       
      </body>
    </html>
  );
}

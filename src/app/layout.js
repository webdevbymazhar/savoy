import "./globals.css"
import {Toaster} from 'react-hot-toast'

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
        {children}
      </body>
    </html>
  );
}

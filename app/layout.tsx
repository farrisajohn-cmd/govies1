import './globals.css';

export const metadata = {
  title: 'Govies FHA Chatbot',
  description: 'Ask for a FHA quote',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        {children}
      </body>
    </html>
  );
}

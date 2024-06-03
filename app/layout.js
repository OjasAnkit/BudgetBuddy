import { Inter, Outfit } from "next/font/google"; // importing the outfit font from google fonts
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] }); // this is the font that is applied for the application

export const metadata = {
  title: "BudgetBuddy",
  description: "Your ultimate money-saving sidekick!", // the metadata generally helps with the SEO
};

export default function RootLayout({ children }) {
  // here we are basically making this function the default export function for this file, whenever this file is imported in some other file the RootLayout will be the function imported
  return (
    <ClerkProvider>
      <html lang="en">
        {
          // using the below line we are basically applying the class containing the font to the entire body of content
          <body className={outfit.className}>
            <Toaster/>
            {children}
          </body> /* all the pages will be rendered through children here */
        }
      </html>
    </ClerkProvider>
  );
}

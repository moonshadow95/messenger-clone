import './globals.css'
import {Inter} from 'next/font/google'
import ToasterContext from "@/app/context/ToasterContext";
import AuthContext from "@/app/api/context/AuthContext";
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'Messenger Clone',
  description: 'Messenger Clone',
}

export default function RootLayout(
  {
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <AuthContext>
      <ToasterContext/>
      {children}
    </AuthContext>
    </body>
    </html>
  )
}

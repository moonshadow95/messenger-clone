import Sidebar from "@/app/components/sidebar/Sidebar";
import React from 'react';

const Layout = async (
  {
    children
  }: {
    children: React.ReactNode
  }) => {
  return (
    //@ts-expect-error Server Component
    <Sidebar>
      <div className={`h-full`}>
        {children}
      </div>
    </Sidebar>
  )
};

export default Layout;
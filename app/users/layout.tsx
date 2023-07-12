import Sidebar from "@/app/components/sidebar/Sidebar";
import React from 'react';
import getUsers from "@/app/actions/getUsers";
import UserList from "@/app/users/component/UserList";

const Layout = async (
  {
    children
  }: {
    children: React.ReactNode
  }) => {
  const users =await getUsers()

  return (
    //@ts-expect-error Server Component
    <Sidebar>
      <div className={`h-full`}>
        <UserList items={users}/>
        {children}
      </div>
    </Sidebar>
  )
};

export default Layout;
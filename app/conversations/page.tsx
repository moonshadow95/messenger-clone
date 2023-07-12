'use client'

import React from 'react';
import useConversation from "@/app/hooks/useConversation";
import EmptyState from "@/app/components/emptyState";
import clsx from "clsx";

const Page = () => {
  const {isOpen}=useConversation()

  return (
  <div className={clsx(
    `lg:pl-80 h-full lg:block`,
    isOpen ? 'block' : 'hidden'
  )}>
    <EmptyState/>
  </div>
  )
};

export default Page;
'use client'

import React from 'react';
import {Conversation, User} from "@prisma/client";

interface HeaderProps{
  conversation:Conversation&{
    users:User[]
  }
}


const Header:React.FC<HeaderProps> = (
  {
    conversation
  }) => {
  return (
    <></>
  )
};

export default Header;
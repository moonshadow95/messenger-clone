'use client'

import React, {useEffect, useRef, useState} from 'react';
import {FullMessageType} from "@/app/types";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import MessageBox from "@/app/components/MessageBox";

interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = (
  {
    initialMessages
  }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null)

  const {conversationId} = useConversation()

  // 읽음 표시
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  return (
    <div className={`flex-1 overflow-y-auto`}>
      {messages.map((message, index) => (
        <MessageBox
          isLast={index === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className={`pt-24`}/>
    </div>
  )
};

export default Body;
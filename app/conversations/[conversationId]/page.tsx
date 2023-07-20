import React from 'react';
import EmptyState from "@/app/components/emptyState";
import getConversationById from "@/app/actions/getConversationById";
import Body from "@/app/conversations/[conversationId]/components/Body";
import Header from "@/app/conversations/[conversationId]/components/Header";
import Form from "@/app/conversations/[conversationId]/components/Form";
import getMessages from "@/app/actions/getMessages";

interface IParams {
  conversationId: string
}

const ChatId = async ({params}: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId)
  const messages = await getMessages(params.conversationId)

  if (!conversation) {
    return (
      <div className={`lg:pl-80 h-full`}>
        <div className={`h-full flex flex-col`}>
          <EmptyState/>
        </div>
      </div>
    )
  }
  return (
    <div className={`lg:pl-80 h-full`}>
      <div className={`h-full flex flex-col`}>
        <Header conversation={conversation}/>
        <Body initialMessages={messages}/>
        <Form/>
      </div>
    </div>
  )
};

export default ChatId;
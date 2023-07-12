'use client'

import React, {useCallback, useMemo} from 'react';
import {FullConversationType} from "@/app/types";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import useOtherUser from "@/app/hooks/useOtherUser";
import {format} from 'date-fns'
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

interface ConversationBoxProps {
  data: FullConversationType
  selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = (
  {
    data,
    selected
  }) => {
  // 로그인 된 나를 제외한 유저
  const otherUser = useOtherUser(data)
  const session = useSession()
  const router = useRouter()
  // 대화방으로 이동
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`)
  }, [data, router])
  // 마지막 메세지
  const lastMessage = useMemo(() => {
    const messages = data.messages || []

    return messages[messages.length - 1]
  }, [data.messages])
  // 로그인 된 유저 이메일
  const userEmail = useMemo(() => session.data?.user?.email, []);
  // 마지막 메세지가 없으면 false, 마지막 메세지의 seen 값에 로그인 된 유저가 있는 경우 true
  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false
    }

    const seenArray = lastMessage.seen || []

    if (!userEmail) {
      return false
    }

    return Boolean(seenArray.filter((user) => user.email === userEmail))
  }, [userEmail, lastMessage]);
  // 대화목록에서 보여질 마지막 대화내용
  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Send an image'
    }

    if (lastMessage?.body) {
      return lastMessage.body
    }

    return 'Started a conversation'
  }, [lastMessage]);

  return (
    <div onClick={handleClick}
      className={clsx(`
      w-full
      relative
      flex
      items-center
      space-x-3
      p-3
      hover:bg-neutral-100
      rounded-lg
      transition
      cursor-pointer
    `,
      selected ? 'bg-neutral-100' : 'bg-white'
    )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users}/>
      ) : (
        <Avatar user={otherUser}/>
      )}
      <div className={`min-w-0 flex-1`}>
        <div className={`focus:outline-none`}>
          <span className={`absolute inset-0`} aria-hidden='true'/>
            <div>
              <p className={`text-md font-medium text-gray-900`}>
                {data.name || otherUser.name}
              </p>
              {lastMessage?.createdAt && (
                <p className={`text-xs text-gray-400 font-light`}>
                  {format(new Date(lastMessage.createdAt), 'p')}
                </p>
              )}
            </div>
            <p className={clsx(`
              truncate
              text-sm
            `,
              hasSeen?'text-gray-500':'text-black font-medium'
            )}>
              {lastMessageText}
            </p>
        </div>
      </div>
    </div>
  )
};

export default ConversationBox;
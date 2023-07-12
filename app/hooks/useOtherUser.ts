import {FullConversationType} from "@/app/types";
import {User} from "@prisma/client";
import {useSession} from "next-auth/react";
import {useMemo} from "react";

/**
 * 대화에 참여한 유저들 중 현재 로그인 되어 있는 유저를 제외한 유저를 가져온다.
 * */
const useOtherUser = (conversation: FullConversationType | { users: User[] }) => {
  const session = useSession()

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email

    const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail)

    return otherUser[0]
  }, [session.data?.user?.email, conversation.users])

  return otherUser
}

export default useOtherUser
import {useParams} from 'next/navigation'
import {useMemo} from 'react'

/**
 * params 에 대화 아이디가 있는지 확인하고 대화창이 열려있는지와, 대화 아이디를 반환한다.
 * */
const useConversation = () => {
  const params = useParams()

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return ''
    }

    return params.conversationId as String
  }, [params?.conversationId])

  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(() => ({
    isOpen, conversationId
  }), [isOpen, conversationId]);
};

export default useConversation;
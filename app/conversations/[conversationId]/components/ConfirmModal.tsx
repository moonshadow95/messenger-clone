'use client'

import React, {useCallback, useState} from 'react';
import {useRouter} from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import {toast} from "react-hot-toast";
import Modal from "@/app/conversations/[conversationId]/components/Modal";

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = (
  {
    isOpen,
    onClose
  }) => {
  const router = useRouter()
  const{conversationId} = useConversation()
  const [isLoading, setIsLoading] = useState(false);

  const onDelete= useCallback(()=>{
      setIsLoading(true)

    axios.delete(`/api/conversations/${conversationId}`)
      .then(()=>{
        onClose()
        router.push('/conversations')
        router.refresh()
      })
      .catch(()=>toast.error('Something went wrong!'))
      .finally(()=>setIsLoading(false))
  },[router,conversationId, onClose])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>

    </Modal>
  )
};

export default ConfirmModal;
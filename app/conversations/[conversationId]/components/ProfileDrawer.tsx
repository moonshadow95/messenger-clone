'use client'

import React, {Fragment, useState} from 'react';
import {Conversation, User} from "@prisma/client";
import ConfirmModal from "@/app/conversations/[conversationId]/components/ConfirmModal";
import {Dialog, Transition} from "@headlessui/react";
import {IoClose} from "react-icons/io5";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import useOtherUser from "@/app/hooks/useOtherUser";

interface ProfileDrawerProps {
  isOpen: boolean
  onClose: () => void
  data: Conversation & {
    users: User[]
  }
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = (
  {
    isOpen,
    onClose,
    data
  }
) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const otherUser = useOtherUser(data)

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as='div' className={`relative z-50`} onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter={'ease-out duration-500'}
            enterFrom={'opacity-0'}
            enterTo={'opacity-100'}
            leave={'ease-in duration-500'}
            leaveFrom={'opacity-100'}
            leaveTo={'opacity-0'}
          >
            <div className={`fixed inset-0 bg-black bg-opacity-40`}/>
          </Transition.Child>
          <div className={`fixed inset-0 overflow-hidden`}>
            <div className={`absolute inset-0 overflow-hidden`}>
              <div className={`pointer-events-none fixed inset-y--0 right-0 flex max-w-full pl-10`}>
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className={`pointer-events-auto w-screen max-w-md`}>
                    <div className={`flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl`}>
                      <div className={`px-4 sm:px-6`}>
                        <div className={`flex items-start justify-end`}>
                          <div className={`ml-3 flex h-7 items-center`}>
                            <button
                              type='button'
                              className={`
                                rounded-md 
                                bg-white 
                                text-gray-400 
                                hover:text-gray-500 
                                focus:outline-none
                                focus:ring-2
                                focus:ring-indigo-500
                                focus:ring-offset-2
                              `}
                              onClick={onClose}
                            >
                              <span className={'sr-only'}>Close panel</span>
                              <IoClose size={24} aria-hidden={true}/>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`relative mt-6 flex-1 px-4 sm:px-6`}>
                      <div className={`flex flex-col items-center`}>
                        <div className={`mb-2`}>
                          {data.isGroup?<AvatarGroup users={data.users} /> : <Avatar user={otherUser}/>}
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
};

export default ProfileDrawer;
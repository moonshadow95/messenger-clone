import getCurrentUser from "@/app/actions/getCurrentUser";
import {NextResponse} from "next/server";
import prismadb from "@/app/libs/prismadb";

interface IParams {
  conversationId?: string
}

export async function POST(
  request: Request,
  {params}: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser()
    const {
      conversationId
    } = params

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', {status: 401})
    }

    // 대화 찾기
    const conversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        messages: {
          include: {
            seen: true
          }
        }
      }
    })

    if (!conversation) {
      return new NextResponse('Invalid ID', {status: 400})
    }

    // 마지막 메세지 찾기
    const lastMessage = conversation.messages[conversation.messages.length - 1]

    if (!lastMessage) {
      return NextResponse.json(conversation)
    }

    // 마지막 메세지 읽음 표시
    const updatedMessage = await prismadb.message.update({
      where: {
        id: lastMessage.id
      },
      include: {
        sender: true,
        seen: true
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      }
    })

    return NextResponse.json(updatedMessage)
  } catch (error: any) {
    console.log(error, 'ERROR_MESSAGES_SEEN')
  }
}
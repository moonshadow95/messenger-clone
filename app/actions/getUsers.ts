import prismadb from "@/app/libs/prismadb";
import getSession from "@/app/actions/getSession";

const getUsers = async () => {
  const session = await getSession()

  if (!session?.user?.email) {
    return []
  }

  try {
    const users = await prismadb.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        // 로그인 한 자신의 email 을 제외한 유저를 찾는다.
        NOT: {
          email: session.user.email
        }
      }
    })
    return users
  } catch (error: any) {
    return []
  }
}

export default getUsers
import {PrismaClient} from '@prisma/client'

// 전역변수로 prisma 선언
declare global {
  var prisma: PrismaClient | undefined
}

// 'globalThis' 는 JS 에서 전역 객체를 나타내는 표준 내장 객체.
// 'globalThis' 를 사용하여 어떤 환경에서든 전역 객체에 접근할 수 있다.
const client = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client
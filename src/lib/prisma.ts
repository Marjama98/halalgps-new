import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
console.log(process.env.DATABASE_URL) // Sjekk om URL-en er riktig lastet


export default prisma

import prisma from "@/lib/db"

export async function GET() {
    const customers = await prisma.invoice.findMany({})
    return Response.json(customers)
}
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const ITEMS_PER_PAGE = 10; // Thay đổi số lượng items mỗi trang theo nhu cầu

export async function fetchFilteredInvoices(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await prisma.invoice.findMany({
      where: {
        OR: [
          {
            customer: {
              name: {
                contains: query,
                mode: "insensitive", // ILIKE tương đương
              },
            },
          },
          {
            customer: {
              email: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
            image_url: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return invoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}
export async function fetchInvoicesPages(query: string): Promise<number> {
  try {
    // Tìm tổng số lượng hóa đơn phù hợp với điều kiện
    const count = await prisma.invoice.count({
      where: {
        OR: [
          {
            customer: {
              name: {
                contains: query,
                mode: 'insensitive', // Không phân biệt chữ hoa/thường
              },
            },
          },
          {
            customer: {
              email: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
          {
            amount: {
              equals: parseFloat(query) || undefined, // Chuyển đổi nếu query là số
            },
          },
        ],
      },
    });

    // Tính tổng số trang
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}
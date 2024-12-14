import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@db/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { nameEn, nameAr } = req.query;

  try {
    const trains = await prisma.train.findMany({
      where: {
        OR: [
          { nameEn: { contains: nameEn as string, mode: 'insensitive' } },
          { nameAr: { contains: nameAr as string, mode: 'insensitive' } }
        ]
      },
      include:{
        seats: true
      }
    });

    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}
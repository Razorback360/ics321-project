import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PATCH') {
    const waitlistEntry = await prisma.waitingList.update({
      where: { id: Number(id) },
      data: { promoted: true },
    });
    res.status(200).json(waitlistEntry);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { staffId, trainId, date } = req.body;
    const assignment = await prisma.staff.create({
      data: {
        userId: staffId,
        train: {
          connect: { id: trainId },
        },
        trainSchedules: {
          create: {
            trainId,
            departTime: new Date(date),
          },
        },
      },
    });
    res.status(200).json(assignment);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

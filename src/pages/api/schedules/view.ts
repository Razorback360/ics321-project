import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@db/index';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const schedules = await prisma.trainSchedule.findMany({
        include: {
          train: true,
          fromStation: true,
          toStation: true,
        },
      });
      res.status(200).json(schedules);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch schedules.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}

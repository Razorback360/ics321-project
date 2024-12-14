import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@db/index';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { staffId, trainId } = req.body;

    try {
      const assignment = await prisma.staff.update({
        where: { id: staffId },
        data: {
          user: {
            connect: { id: trainId },
          },
        },
      });
      res.status(200).json(assignment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to assign staff.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}

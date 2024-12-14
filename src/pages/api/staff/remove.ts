import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@db/index';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { staffId } = req.body;

    try {
        const staff = await prisma.staff.delete({
            where: { id: staffId },
          });
          
          
      res.status(200).json(staff);
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove staff.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}

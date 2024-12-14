import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@db/index';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { trainId, fromStationId, toStationId, departTime, arrivalTime, sequenceNumber } = req.body;
  
      try {
        const schedule = await prisma.trainSchedule.create({
          data: {
            trainId: parseInt(trainId), // Ensure these are integers
            fromStationId: parseInt(fromStationId),
            toStationId: parseInt(toStationId),
            departTime: new Date(departTime),
            arrivalTime: new Date(arrivalTime),
            sequenceNumber: parseInt(sequenceNumber), // Add required sequenceNumber
          },
        });
        res.status(200).json(schedule);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add schedule.' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed.' });
    }
  }
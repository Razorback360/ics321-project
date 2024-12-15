import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@db/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));

    const activeTrains = await prisma.trainSchedule.findMany({
      where: {
        departTime: { gte: startOfDay, lte: endOfDay },
        // arrivalTime: { gte: new Date() },
      },
      include: {
        train: true,
        toStation: true,
        fromStation: true,
      },
    });

    res.status(200).json({ activeTrains });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch active trains." });
  }
}

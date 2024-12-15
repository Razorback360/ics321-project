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
    const trainStations = await prisma.trainSchedule.findMany({
      include: {
        train: true,
        fromStation: true,
        toStation: true,
      },
    });

    res.status(200).json({ trainStations });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch train stations." });
  }
}

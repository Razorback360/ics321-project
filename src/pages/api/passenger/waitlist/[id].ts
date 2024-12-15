import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@db/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Train number is required." });
  }

  try {
    const waitlistedPassengers = await prisma.waitingList.findMany({
      where: {
        trainId: parseInt(id as string),
      },
      include: {
        passenger: {
          include: {
            user: {
              include: {
                loyaltyMiles: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({ waitlistedPassengers });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch waitlisted passengers." });
  }
}

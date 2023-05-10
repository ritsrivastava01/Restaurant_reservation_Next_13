import { NextApiRequest, NextApiResponse } from 'next';
import * as jose from 'jose';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const bearerToken = req.headers['authorization'] as string;
    const token = bearerToken.split(' ')[1];
    const payload = jwt.decode(token) as { email: string };
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: {
        email: payload.email
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        city: true,
        phone: true
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      city: user.city,
      phone: user.phone
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

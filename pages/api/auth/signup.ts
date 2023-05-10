import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import { setCookie } from 'cookies-next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { first_name, last_name, email, city, phone, password } = req.body;
    const prisma = new PrismaClient();
    const ValidatorSchema = [
      {
        valid: validator.isLength(first_name, { min: 1, max: 20 }),
        errorMessage: 'First name must be between 1 and 20 characters'
      },
      {
        valid: validator.isLength(last_name, { min: 1, max: 20 }),
        errorMessage: 'Last name must be between 1 and 20 characters'
      },
      {
        valid: validator.isEmail(email),
        errorMessage: 'Email is invalid'
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: 'Password is invalid'
      },
      {
        valid: validator.isLength(city, { min: 1, max: 20 }),
        errorMessage: 'City must be between 1 and 20 characters'
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: 'Phone number is invalid'
      }
    ];
    const errors = ValidatorSchema.filter((field) => !field.valid);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    const isUniqueEmail = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (isUniqueEmail) {
      return res
        .status(400)
        .json({ errors: [{ errorMessage: 'Email is already taken' }] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        city,
        phone,
        password: hashedPassword
      }
    });
    if (user.id) {
      const alg = 'HS256';
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const token = await new jose.SignJWT({ email: user.email })
        .setProtectedHeader({ alg })
        .setExpirationTime('24h')
        .sign(secret);

      setCookie('jwt', token, { req, res, maxAge: 60 * 6 * 24 });
      res.status(200).json({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        city: user.city,
        phone: user.phone
      });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../lib';

const auth_post_login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await findUser(email, password);
    res.json({
      user: {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.log('error in login', error);
    res.json({ error: error.message });
  }
};

const findUser = async (email: string, password: string) => {
  if (!email) throw new Error('البريد الإلكتروني مطلوب');
  if (!password) throw new Error('كلمة المرور مطلوبة');

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('هذا البريد الإلكتروني غير مسجل مسبقاً');
  console.log('res from prisma', user);

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error('كلمة المرور غير صحيحة');

  return user;
};

export { auth_post_login };

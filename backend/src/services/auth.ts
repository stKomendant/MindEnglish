import { prisma } from "../lib/prisma";

export const registerUser = async (
  email: string,
  password: string,
  username: string,
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw Error("dfefwefewfew");
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      username,
      password,
    },
  });

  return newUser;
};

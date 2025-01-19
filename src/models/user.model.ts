import prisma from "../config/prisma";

export const findUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: { username },
    include: { role: true },
  });
};

export const findRoleByName = (name: string) => {
  return prisma.role.findUnique({ where: { name } });
};

export const findUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { role: true },
  });
};

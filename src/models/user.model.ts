import prisma from "../config/prisma.js";
import { User, UserWithRole } from "../types/user.js";

export const findUserByUsername = (
  username: string
): Promise<UserWithRole | null> => {
  return prisma.user.findUnique({
    where: { username },
    include: { role: true },
  });
};

export const findRoleByName = (name: string) => {
  return prisma.role.findUnique({ where: { name } });
};

export const findUserById = async (
  userId: number
): Promise<UserWithRole | null> => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { role: true },
  });
};

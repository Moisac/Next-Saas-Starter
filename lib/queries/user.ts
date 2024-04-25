import prisma from "@/lib/db";
import { auth } from "@/auth";
import { Role } from "@/types/user";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        isActive: true
      },
      select: {
        name: true,
        emailVerified: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ 
      where: { id, isActive: true },
    });

    return user;
  } catch {
    return null;
  }
};

export const getLoggedUser = async () => {
    const session = await auth();

    if(!session?.user?.isActive) {
      return null
    }
    console.log(session?.user)

    return session?.user;
}

export const getUsersList = async () => {
  try {
    const users = await prisma.user.findMany({ where: { role: Role.USER } });

    return users;
  } catch {
    return null;
  }
};
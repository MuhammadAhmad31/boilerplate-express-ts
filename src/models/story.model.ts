import prisma from "../config/prisma.js";
import { CreateStoryData, Story, UpdateStoryData } from "../types/story.js";
import { User } from "../types/user.js";

export const findStoryById = (storyId: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id: storyId },
    include: { role: true },
  });
};

export const findStoryByUserId = (userId: string): Promise<Story | null> => {
  return prisma.role.findUnique({
    where: { authorId: userId },
    include: { user: true },
  });
};

export const createStory = async (data: CreateStoryData): Promise<Story> => {
  return prisma.story.create({
    data,
  });
};

export const updateStory = async (
  storyId: string,
  data: UpdateStoryData
): Promise<Story> => {
  return prisma.story.update({
    where: { id: storyId },
    data,
  });
};

export const deleteStory = async (storyId: string) => {
  return prisma.story.delete({
    where: { id: storyId },
  });
};

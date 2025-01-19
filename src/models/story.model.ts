import prisma from "../config/prisma";
import { CreateStoryData, Story, UpdateStoryData } from "../types/story";

// Fetch a user by their ID, including their role
export const findUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { role: true },
  });
};

// Fetch all stories authored by a specific user
export const findStoriesByUserId = async (userId: string) => {
  return prisma.story.findMany({
    where: { authorId: userId },
    include: { author: true },
  });
};

// Create a new story
export const createStory = async (data: CreateStoryData) => {
  return prisma.story.create({
    data,
  });
};

// Update an existing story by its ID
export const updateStory = async (
  storyId: string,
  data: UpdateStoryData
): Promise<Story> => {
  return prisma.story.update({
    where: { id: storyId },
    data,
  });
};

// Delete a story by its ID
export const deleteStory = async (storyId: string) => {
  return prisma.story.delete({
    where: { id: storyId },
  });
};

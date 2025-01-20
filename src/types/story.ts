export interface Story {
  id?: string;
  title: string;
  imageUrl?: string;
  content: string;
  authorId?: string;
}

export interface CreateStoryData {
  title?: string;
  content?: string;
  authorId?: string;
}

export interface UpdateStoryData {
  title?: string;
  content?: string;
  authorId?: string;
}

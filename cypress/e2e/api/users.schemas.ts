import { z } from 'zod';

export const reqresUserSchema = z.object({
  id: z.union([z.number(), z.string().min(1)]), // id string fallback
  email: z.email(),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.url(),
});

export const getUsersResponseSchema = z.object({
  page: z.number().int().positive(),
  per_page: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  total_pages: z.number().int().positive(),
  data: z.array(reqresUserSchema),
});

export const createUserResponseSchema = z.object({
  name: z.string().min(1),
  job: z.string().min(1),
  id: z.union([z.string().min(1), z.number()]), // id number fallback
  createdAt: z.string().min(1),
});

export const updateUserResponseSchema = z.object({
  name: z.string().min(1),
  job: z.string().min(1),
  updatedAt: z.string().min(1),
});

export type ReqresUser = z.infer<typeof reqresUserSchema>;
export type GetUsersResponse = z.infer<typeof getUsersResponseSchema>;
export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;
export type UpdateUserResponse = z.infer<typeof updateUserResponseSchema>;

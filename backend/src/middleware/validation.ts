import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional(),
});

// Validation for full user creation (POST)
export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(400).json({ error: 'Invalid request data' });
  }
};

// Validation for partial user update (PATCH)
export const validateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateSchema = userSchema.partial(); // makes all fields optional
    updateSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(400).json({ error: 'Invalid request data' });
  }
};

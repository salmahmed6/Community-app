import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, bio, avatarUrl } = req.body;
        
        //check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: {email},
        });

        if(existingUser) {
            res
            .status(400)
            .json({ message: 'Email already exists'});
            return;
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                bio,
                avatarUrl,
            },
        });

        res
        .status(201)
        .json({ message: 'User created successfully', user });
        
    } catch(error) {
        res
        .status(500)
        .json({message: 'Failed to create user', error});
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data  = req.body;
      
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });
      
      if (!existingUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      // Check if email is already taken by another user
      if (data.email && data.email !== existingUser.email) {
        const emailExists = await prisma.user.findUnique({
          where: { email: data.email },
      });
        
        if (emailExists) {
          res.status(400).json({ error: 'Email already exists' });
          return;
        }
      }
      
      const updatedUser = await prisma.user.update({
        where: { id },
        data: data ,
      });
      
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc'},
        });
        res.json(users);
    } catch(error) {
        res
        .status(500)
        .json({message: 'Failed to retrieve users', error});
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        
        const user = await prisma.user.findUnique({
            where: { id },
        });
        
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};
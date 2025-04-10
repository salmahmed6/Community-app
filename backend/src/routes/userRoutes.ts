import express from 'express';
import { getUsers,
        getUserById,
        createUser,
        updateUser,
} from '../controllers/userController';
import { validateUserData } from '../middleware/validation';
import { RequestHandler } from 'express';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', validateUserData as RequestHandler, createUser);
router.put('/:id', validateUserData as RequestHandler, updateUser);

export { router as userRouter };
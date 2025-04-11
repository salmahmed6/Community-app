import express from 'express';
import { getUsers,
        getUserById,
        createUser,
        updateUser,
} from '../controllers/userController';
import { validateUpdateUser,validateCreateUser  } from '../middleware/validation';
import { RequestHandler } from 'express';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', validateCreateUser as RequestHandler, createUser);
router.patch('/:id', validateUpdateUser as RequestHandler, updateUser);

export { router as userRouter };
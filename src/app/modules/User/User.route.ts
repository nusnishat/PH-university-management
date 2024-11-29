import express from 'express'
import { UserControllers } from './User.controller';

const router = express.Router();

router.post('/create-student', UserControllers.createStudent);

export const UserRoutes = router;
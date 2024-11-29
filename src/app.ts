import express, { Request, Response } from "express"
import cors from 'cors';
import { StudentRoutes } from "./app/modules/student/student.route";
import { UserRoutes } from "./app/modules/User/User.route";

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello hi World!')
})

export default app;

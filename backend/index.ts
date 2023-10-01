import 'dotenv/config';
import express, { Express } from 'express';
import {
  attendanceRouter,
  authRouter,
  dailyTaskRouter,
  studentsRouter,
  bestStudentRouter,
} from './routes';
import cors from 'cors';

const app: Express = express();

// middlewares
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/students', studentsRouter);
app.use('/attendance', attendanceRouter);
app.use('/daily-task', dailyTaskRouter);
app.use('/best-student', bestStudentRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});

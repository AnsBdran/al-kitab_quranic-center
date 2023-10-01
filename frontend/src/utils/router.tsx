import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainLayout from '../layouts/default';
import {
  Login,
  SurahsProgress,
  Attendance,
  Home,
  Dashboard,
  DailyTask,
  TopStudents,
  WBW,
} from '../pages';
import Redirect from './redirect';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route element={<Home />} index />
      <Route element={<Attendance />} path='attendance' />
      <Route element={<DailyTask />} path='daily-task' />
      <Route element={<SurahsProgress />} path='surahs-progress' />
      <Route element={<TopStudents />} path='top' />
      <Route element={<WBW />} path='wbw' />
      <Route
        element={
          <Redirect>
            <Login />
          </Redirect>
        }
        path='login'
      />
      <Route
        element={
          <Redirect>
            <Dashboard />
          </Redirect>
        }
        path='dashboard'
      />
    </Route>
  )
);

export default router;

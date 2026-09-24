import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import Login from './pages/Login';
import Signup from './pages/SignUp'
import { useState } from 'react';

const App = () => {
  // Add New Job
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  // Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  // Update Job
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return;
  };

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      return user && user.token ? true : false;
    });

  const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route path='/' element={<MainLayout />}>
        
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={isAuthenticated ? <AddJobPage addJobSubmit={addJob} /> : <Navigate to="/login" />} />

        <Route
          path="/edit-job/:id"
          element={
            isAuthenticated ? <EditJobPage updateJobSubmit={updateJob}/> : <Navigate to="/login" />
          }
        />
        <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path='*' element={<NotFoundPage />} />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Signup setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;

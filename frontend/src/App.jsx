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
  const authHeaders = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.token}`,
    };
  };

  const checkResponse = async (res) => {
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || data.message || 'Request failed');
    }
  };

  // Add New Job
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(newJob),
    });
    await checkResponse(res);
  };

  // Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    await checkResponse(res);
  };

  // Update Job
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(job),
    });
    await checkResponse(res);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      return user && user.token ? true : false;
    });

  const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route
        path='/'
        element={
          <MainLayout
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        }
      >
        
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={isAuthenticated ? <AddJobPage addJobSubmit={addJob} /> : <Navigate to="/login" />} />

        <Route
          path="/edit-job/:id"
          element={
            isAuthenticated ? <EditJobPage updateJobSubmit={updateJob}/> : <Navigate to="/login" />
          }
          loader={jobLoader}
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

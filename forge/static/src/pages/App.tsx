import Navigation from '../components/Navigation';
import React, { Suspense } from 'react';
import { ToastContainer } from "react-toastify";
import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';
import { Loader } from '../components/common/Loader/Loader';

const Task = React.lazy(() => import("./Task"));
const Team = React.lazy(() => import("./Team"));

function App() {

  return (
    <>
      <ToastContainer />
      <Navigation />

      <Routes>
        <Route path='/tasks' element={
          <Suspense fallback={<Loader />}>
            <Task />
          </Suspense>
        } />
        <Route path='/team' element={
          <Suspense fallback={<Loader />}>
            <Team />
          </Suspense>
        } />

        <Route path='/' element={<Navigate to="/tasks" replace />} />
      </Routes>
    </>
  )
}

export default App

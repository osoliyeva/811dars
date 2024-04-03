import { Button, CssBaseline } from '@mui/material';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Chats from './pages/Chats';
import Login from './pages/Login';
import Protected from './pages/Protected';




const router = createBrowserRouter([
  {
    path: "./",
    element: <App />,
  },
  {
    path: "/Chats",
    element: <Chats />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  // {
  //   path: "/chat-room/:id",
  //   element: <ChatSRoom />,
  // },

])



function App() {
  return (
    <div className="App">
      <CssBaseline/>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

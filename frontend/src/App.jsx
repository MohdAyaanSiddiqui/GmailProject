import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Inbox from './components/Inbox'
import Mail from './components/Mail'
import Body from './components/Body'
import SendEmail from './components/SendEmail'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Toaster } from 'react-hot-toast'
import "./App.css"
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Inbox />
      },
      {
        path: "/mail/:id",
        element: <Mail />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  }
])
function App() {
  return (
    <div className='bg-[#F6F8FC] h-screen'>
      <RouterProvider router={appRouter} />
      <div className='absolute w-[30%] bottom-0  right-20 z-index'>
        <SendEmail />
      </div>
      <Toaster />
    </div>

  )
}

export default App

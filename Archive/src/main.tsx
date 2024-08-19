import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile/dashboard'
import { Layout } from './pages/Profile/Layout'
import { Photos } from './pages/Profile/photos'
import { Settings } from './pages/Profile/settings'
import { Search } from './pages/Profile/search'
import { Account } from './pages/Profile/Account'
import { UpadtePassword } from './components/Settings/Update/UpdatePassword'
import { UpdateLogin } from './components/Settings/Update/updateL/UpdateLogin'
import { Followers } from './pages/Followers'
import { Followings } from './pages/Followings'
import { Requests } from './pages/Requests'

const routes = createBrowserRouter([
  {
    path: '',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/profile',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Profile />
      },
      {
        path: 'albums',
        element: <Photos />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: ":id",
        element: <Account />
      },
      {
        path: "/profile/settings/update",
        element: <UpadtePassword />
      },
      {
        path: "/profile/settings/update/updateL",
        element: <UpdateLogin />
      },
      {
        path: "followers",
        element: <Followers />
      },
      {
        path: "followings",
        element: <Followings />
      },
      {
        path: "requets",
        element: <Requests />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}>
    </RouterProvider>
  </StrictMode>,
)

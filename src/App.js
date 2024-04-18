import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'

// layouts and pages
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Subscription from './pages/Subscription'
import About from './pages/About'
import Saved from './pages/Saved'


// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="HomePage" element={<HomePage />} />
      <Route path="SignIn" element={<SignIn />} />
      <Route path="Register" element={<Register />} />
      <Route path="Subscription" element={<Subscription />} />
      <Route path="About" element={<About />} />
      <Route path="Saved" element={<Saved />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
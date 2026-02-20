import { Layout } from "@/components/Layout"
import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "@/pages/Auth/Login"
import { SignUp } from "@/pages/Auth/Signup"
import { Dashboard } from "./pages/Dashboard"
import { useAuthStore } from "./stores/auth"
import { Transaction } from "./pages/Transactions"
import { Categories } from "./pages/Categories"
import { Profile } from "./pages/Profile"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route 
          path='/login' 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path='/signup' 
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          } 
        />
        <Route 
          path='/' 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/transactions' 
          element={
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/categories' 
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/profile' 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Layout>
  )
}

export default App

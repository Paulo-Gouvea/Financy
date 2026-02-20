import { Layout } from "@/components/Layout"
import { Route, Routes } from "react-router-dom"
import { Login } from "@/pages/Auth/Login"
import { SignUp } from "@/pages/Auth/Signup"

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route 
            path="/login"
            element={<Login />}
          />

          <Route 
            path="/signup"
            element={<SignUp />}
          />
        </Routes>
      </Layout>
    </>
  )
}

export default App

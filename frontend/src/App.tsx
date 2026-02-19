import { Layout } from "@/components/Layout"
import { Route, Routes } from "react-router-dom"
import { Login } from "@/pages/Auth/Login"

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route 
            path="/login"
            element={<Login />}
          />
        </Routes>
      </Layout>
    </>
  )
}

export default App

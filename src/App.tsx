import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import EmployeeFormPage from "./pages/EmployeeFormPage"
import EmployeeDataTablePage from "./pages/EmployeeDataTablePage"

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<EmployeeFormPage />} />
        <Route path="/employees" element={<EmployeeDataTablePage />} />
        <Route
          path="*"
          element={
            <div className="min-h-[100vh] flex justify-center items-center">
              <span className="text-3xl font-bold">404 Not found</span>
            </div>
          }
        />
      </Routes>
    </Layout>
  )
}

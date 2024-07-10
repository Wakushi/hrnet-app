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
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Layout>
  )
}

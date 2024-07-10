import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import EmployeeFormPage from "./pages/EmployeeFormPage"
import EmployeeListPage from "./pages/EmployeeListPage"

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<EmployeeFormPage />} />
        <Route path="/employees" element={<EmployeeListPage />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Layout>
  )
}

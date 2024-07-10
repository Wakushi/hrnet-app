import { NavLink } from "react-router-dom"

export default function Header() {
  return (
    <header className="fixed top-0 flex items-center justify-between p-4 w-full z-[98]">
      <h1 className="text-3xl font-bold text-brand">
        <NavLink to="/">HRnet</NavLink>
      </h1>
      <nav>
        <ul className="flex items-center gap-4">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-button active" : "nav-button"
              }
              to="/"
            >
              New employee
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-button active" : "nav-button"
              }
              to="/employees"
            >
              Employee list
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

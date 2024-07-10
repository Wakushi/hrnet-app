import { ReactNode } from "react"
import Header from "./Header"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <Header />
      <main className="min-h-[100vh]">{children}</main>
    </div>
  )
}

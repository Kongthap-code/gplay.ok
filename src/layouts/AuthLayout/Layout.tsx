import Header from "@/components/Authentication/Header"
import { ReactNode } from "react"

function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default Layout
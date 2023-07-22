import { Box, Container, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"
import Header from "@/components/app/Header"
import Sidebar from "@/components/app/Sidebar"

function Layout({ children }: { children: ReactNode }) {
    return (
        <Box bg="#f2f3f4">
        <Container p="0" maxW="1450px" minH="100vh">
            <Flex>
                <Sidebar />
                <Box w="100%">
                    <Header/>
                    {children}
                </Box>
            </Flex>
        </Container>
        </Box>
    )
}

export default Layout
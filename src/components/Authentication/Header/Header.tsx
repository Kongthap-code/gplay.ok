import { Box, Button, Container, Flex, Select, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile } from "@fortawesome/free-solid-svg-icons"

function Header() {
    return (
        <>
            <Box
                position="fixed"
                w="100%"
                p="4"
                zIndex="2"
                h="95px"
                borderBottom="3px solid #33a589"
            >
                <Flex
                    alignItems="center">
                    <Container maxW={['100%', '100%', '90%', '65%', '65%']}>
                        <Flex h="64px" justifyContent="center" alignItems="center" gap="10px">
                            <Select h="36px" fontSize="15px" fontWeight="300" color="#fff" w="150px" _hover={{ "bg": "primary-color8" }} border="none" placeholder='English'>
                                <option value='option1'>ไทย</option>
                            </Select>
                            <Button h="36px" fontSize="15px" color="#fff" fontWeight="300" w="150px" _hover={{ "bg": "primary-color8" }} bg="#0000" border="none">
                            <FontAwesomeIcon icon={faMobile} /> <Text ml="2">Mobile Version</Text>
                            </Button>
                        </Flex>
                    </Container>
                </Flex>
            </Box >
        </>
    )
}

export default Header
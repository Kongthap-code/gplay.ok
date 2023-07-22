import { Box, Flex, Text, Spacer, Button, Image, Select,keyframes } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faMobile,
  faWallet,
  faCircleUser,
  faUser,
  faBriefcase,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { useLocation } from "wouter";

function Header() {
  const [location, setLocation] = useLocation();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("auth-name");

  const me = async () => {
    const opt = {
      method: "GET",
      headers: {
        "auth-token": token || "",
        "auth-name": username || ""
      },
    };
    const me = await fetch(import.meta.env.VITE_DOMAIN_API + import.meta.env.VITE_USERINFO + username, opt).then(
      (res) => res.json()
    );
    return me;
  };

  const { data, isLoading, error } = useQuery(["me", token], me, {
    onSuccess(data) {
      if (data.statusCode === 403) {
        setLocation("/")
        localStorage.removeItem("token")
        localStorage.removeItem("auth-name")
      }
    }
  });

  const animationKeyframes = keyframes`
  0% {left: 0;}
  100% {left: -100%;}
`;

const animation = `${animationKeyframes} 20s cubic-bezier(0, 0.01, 1, 0.99) infinite`;

  return (
    <>
      <Box
        pos="fixed"
        w="1450px"
        h="80px"
        bg="#fff"
      >
        <Flex h="100%" color="#7E8890">

          <Flex bg="primary-color1" h="80px" minW="217px" alignItems="center" justifyContent="center">
            <Image src="https://uat.ambsuperapi.com/img/logo1.png" w="170px" h="auto" />
          </Flex>

          <Flex h="100%" w="100%" direction="column">
            <Flex h="100%" w="100%">
              <Flex px="13px" fontWeight="300" fontSize="15px" alignItems="center" h="100%">
                <Text fontSize="17px"><FontAwesomeIcon icon={faUser} /></Text> <Text ml="2">
                  {isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data[0].name : ""}
                </Text>
              </Flex>
              <Flex px="13px" fontWeight="300" fontSize="15px" alignItems="center" h="100%">
                <Text fontSize="17px"><FontAwesomeIcon icon={faBriefcase} /></Text>
                <Text ml="1">
                  {isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data[0].roles : ""}
                </Text>
                <Text ml="1">
                  ({isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data[0].level : ""})
                </Text>
              </Flex>
              <Flex px="13px" fontWeight="300" fontSize="15px" alignItems="center" h="100%">
                <FontAwesomeIcon icon={faWallet} />
                <Text ml="2">
                  ({isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data[0].wallet[0].type : ""})
                </Text>
                <Text ml="1">
                  {isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data[0].wallet[0].credit : ""} {isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data[0].wallet[0].currency : null}
                </Text>
              </Flex>
              <Spacer />

              <Flex mr="16px" ml="16px" minW="256px" alignItems="center" h="100%" gap="2">
                <Select h="36px" fontSize="15px" w="150px" fontWeight="300" _hover={{ "bg": "#f0f0f0" }} border="none" placeholder='English'>
                  <option value='option1'>ไทย</option>
                </Select>
                <Button h="36px" fontSize="15px" fontWeight="300" w="85px" _hover={{ "bg": "#f0f0f0" }} bg="#0000" border="none">
                  <Text fontSize="17px"><FontAwesomeIcon icon={faPlay} /></Text> <Text ml="2">Guid</Text>
                </Button>
                <Button onClick={e => {
                  localStorage.removeItem("token")
                  setLocation("/")
                }} h="36px" fontSize="15px" fontWeight="300" w="100px" _hover={{ "bg": "#f0f0f0" }} bg="#0000" border="none">
                  <Text fontSize="17px"><FontAwesomeIcon icon={faRightFromBracket} /></Text> <Text ml="2">Logout</Text>
                </Button>
              </Flex>
            </Flex>
            <Flex position="relative" overflow="hidden" fontSize="0.815rem" h="50%" justifyContent="end" alignItems="center" color="#000" bg="#fde60c">
              <Box position="absolute" top="50%" w="100%" transform="translate(100%, -50%)" animation={animation}>Welcome to AMBSuperAPI</Box>
            </Flex>
          </Flex>
        </Flex>
      </Box >
    </>
  );
}
export default Header;

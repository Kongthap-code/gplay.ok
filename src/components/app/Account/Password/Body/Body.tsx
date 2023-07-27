import { Box, Flex, Text, Tabs, TabList, TabPanels, Tab, TabPanel, FormControl, FormLabel, Input, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td, useToast, FormHelperText } from "@chakra-ui/react"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Field, Form, Formik } from "formik";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useLocation } from "wouter"

interface InformationProp {
  username: string;
  password: string;
}

function Password() {
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

  const { data, isLoading } = useQuery(["me", token], me, {
    onSuccess(data) {
      if (data.statusCode === 403) {
        setLocation("/")
        localStorage.removeItem("token")
        localStorage.removeItem("auth-name")
      }
    }
  });

  return (
    <Formik<InformationProp>
      // isInitialValid={false}
      validate={(values) => {
        if (values.username === "") {
          console.log(values)
          return { username: "" }
        } else if (values.password === "") {
          return { password: "" }
        }
      }
      }
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values)
        // mutate({ username: values.username, password: values.password })
        setSubmitting(true);
      }
      }
    >
      {() => (
        <>
          <Box w="50%">
            <Form>
              <Flex color="#1F2532" fontSize="14px" direction="column" justifyContent="center" alignItems="center">
                <FormControl my="1">
                  <Flex justifyContent='center' alignItems='center'>
                    <Box px="3" w="180px" textAlign="end">
                      <Text fontWeight="500">Username</Text>
                    </Box>
                    <Field as={Input} name="username" disabled fontWeight="300" fontSize="14px" bg="#eaecef" h="35px" w="325px" mr="10" value={isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data[0].username : ""} />
                  </Flex>
                </FormControl>

                <FormControl my="1">
                  <Flex justifyContent='center' alignItems='center'>
                    <Box px="3" w="180px" textAlign="end">
                      <Text fontWeight="500">Old Password ★</Text>
                    </Box>
                    <Input fontWeight="300" fontSize="14px" bg="#eaecef" h="35px" w="325px" mr="10" placeholder='Old Password' />
                  </Flex>
                </FormControl>

                <FormControl my="1">
                  <Flex justifyContent='center' alignItems='center'>
                    <Box px="3" w="180px" textAlign="end">
                      <Text fontWeight="500">New Password ★</Text>
                    </Box>
                    <Flex direction="column">
                      <Input fontWeight="300" fontSize="14px" bg="#eaecef" h="35px" w="325px" mr="10" placeholder='New Password' />
                      <FormHelperText fontSize="10px" color="#00000050">Enter only number (0-9) or letter (A-Z, a-z, ก-ฮ).</FormHelperText>
                    </Flex>
                  </Flex>
                </FormControl>

                <FormControl my="1">
                  <Flex justifyContent='center' alignItems='center'>
                    <Box px="3" w="180px" textAlign="end">
                      <Text fontWeight="500">Confirm Password ★</Text>
                    </Box>
                    <Flex direction="column">
                      <Input fontWeight="300" fontSize="14px" bg="#eaecef" h="35px" w="325px" mr="10" placeholder='Confirm Password' />
                      <FormHelperText fontSize="10px" color="#00000050">Enter only number (0-9) or letter (A-Z, a-z, ก-ฮ).</FormHelperText>
                    </Flex>
                  </Flex>
                </FormControl>

                <Button borderRadius="3px" fontSize="13px" color="#fff" h="35px" bg="#cfa137" _hover={{ bg: "#cfa1377a" }} mt="5" fontWeight="600">
                  Save New Password
                </Button>

              </Flex>
            </Form>
          </Box>
        </>
      )}
    </Formik >
  )
}

function Management() {
  const queryClient = useQueryClient();
  const [location, setLocation] = useLocation();
  const toast = useToast();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("auth-name");
  const { mutate } = useMutation(async () => {
    const opt = {
      method: "POST",
      headers: {
        "auth-token": token || "",
        "auth-name": username || ""
      }
    };
    const login = await fetch(import.meta.env.VITE_DOMAIN_API + import.meta.env.VITE_OPERATOR_PATH + username + import.meta.env.VITE_APIKEY, opt).then(
      (res) => res.json()
    );
    return login;
  }, {
    onSuccess: (data) => {
      if (data.success === true) {
        queryClient.invalidateQueries(['Api'])
      } else {
        toast({
          title: "Something went wrong, please try again.",
          description: "",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  })

  const me = async () => {
    const opt = {
      method: "GET",
      headers: {
        "auth-token": token || "",
        "auth-name": username || ""
      },
    };
    const me = await fetch(import.meta.env.VITE_DOMAIN_API + import.meta.env.VITE_OPERATOR_PATH + username + import.meta.env.VITE_APIKEY, opt).then(
      (res) => res.json()
    );
    return me;
  };

  const { data, isLoading } = useQuery(["Api", token], me, {
    onSuccess(data) {
      if (data.statusCode === 403) {
        setLocation("/")
        localStorage.removeItem("token")
        localStorage.removeItem("auth-name")
      }
    }
  });
  return (
    <>
      <FormControl my="1">
        <Flex justifyContent='center' alignItems='center'>
          <Box px="3" w="130px" textAlign="end">
            <Text fontWeight="500">API Endpoint</Text>
          </Box>
          <Input disabled fontWeight="300" fontSize="14px" bg="#eaecef" h="35px" w="325px" mr="10" value="https://test.ambsuperapi.com" />
        </Flex>
      </FormControl>

      <FormControl my="1">
        <Flex justifyContent='center' alignItems='center'>
          <Box px="3" w="130px" textAlign="end">
            <Text fontWeight="500">Secret Key</Text>
          </Box>
          <Input disabled fontWeight="300" fontSize="14px" bg="#eaecef" h="35px" w="325px" mr="10" value={isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data.masked : ""} />
        </Flex>
      </FormControl>

      <FormControl my="1">
        <Flex justifyContent='center' alignItems='center'>
          <Box px="3" w="80px" textAlign="end">
          </Box>
          <Button onClick={() => { mutate() }} fontSize="12px" color="#fff" h="35px" bg="#cfa137" _hover={{ bg: "#cfa1377a" }} mt="2" fontWeight="400">
            <Text mr="2"><FontAwesomeIcon icon={faPlus} /></Text> Generate API Key
          </Button>
        </Flex>
      </FormControl>
    </>
  )
}

function Body() {
  return (
    <Flex direction="column" h="100vh" bg="#f2f3f4">
      <Flex direction="column" gap="2" pl="235px" pt="90px">
        <Box pl="1">
          <Breadcrumb fontSize="14px" fontWeight="400" my="2">
            <BreadcrumbItem>
              <Box color="#2F80ED">
                <Link href="/app/account/password">Account</Link>
              </Box>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href="/app/account/password">password</Link>
            </BreadcrumbItem>
          </Breadcrumb>
          <Text fontSize="30px" fontWeight="400" mb="1">Change Password</Text>
        </Box>
        <Flex bg="#ffff" columnGap="70px" p="9" boxShadow='xl' borderRadius="5px" w="1210px" direction="row">
          <Password />
        </Flex>
      </Flex>
    </Flex >
  )
}

export default Body
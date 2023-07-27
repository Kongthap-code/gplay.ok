import { Box, Flex, Text, Tabs, TabList, TabPanels, Tab, TabPanel, FormControl, FormLabel, Input, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td, useToast } from "@chakra-ui/react"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Field, Form, Formik } from "formik";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useLocation } from "wouter"

interface InformationProp {
  username: string;
  password: string;
}

function BasicInfo() {
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
              <Flex direction="column" pb="20px">
                <Box fontSize="19px" fontWeight="500">Basic Info</Box>
              </Flex>
              <Flex color="#1F2532" fontSize="14px" direction="column" justifyContent="center" alignItems="center">
                <FormControl my="1">
                  <Flex justifyContent='center' alignItems='center'>
                    <Box px="3" w="130px" textAlign="end">
                      <Text fontWeight="500">Username</Text>
                    </Box>
                    <Field as={Input} name="username" disabled fontWeight="300" fontSize="14px" bg="#eaecef" h="35px" w="325px" mr="10" value={isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data[0].username : ""} />
                  </Flex>
                </FormControl>

                <FormControl my="1">
                  <Flex justifyContent='center' alignItems='center'>
                    <Box px="3" w="130px" textAlign="end">
                      <Text fontWeight="500">Name</Text>
                    </Box>
                    <Input disabled fontWeight="300" fontSize="14px" bg="#eaecef" h="35px" w="325px" mr="10" value={isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data[0].name : ""} />
                  </Flex>
                </FormControl>

                <FormControl my="1">
                  <Flex justifyContent='center' alignItems='center'>
                    <Box px="3" w="130px" textAlign="end">
                      <Text fontWeight="500">Phone</Text>
                    </Box>
                    <Input disabled fontWeight="300" fontSize="14px" bg="#eaecef" h="35px" w="325px" mr="10" value={isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data[0].information.contact.phone : ""} />
                  </Flex>
                </FormControl>

                <FormControl my="1">
                  <Flex justifyContent='center' alignItems='center'>
                    <Box px="3" w="130px" textAlign="end">
                      <Text fontWeight="500">Email</Text>
                    </Box>
                    <Input disabled fontWeight="300" fontSize="14px" bg="#eaecef" h="35px" w="325px" mr="10" value={isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data[0].information.contact.email : ""} />
                  </Flex>
                </FormControl>

                <FormControl my="1">
                  <Flex justifyContent='center' alignItems='center'>
                    <Box px="3" w="130px" textAlign="end">
                      <Text fontWeight="500">Position Type</Text>
                    </Box>
                    <Input disabled fontWeight="300" fontSize="14px" bg="#eaecef" h="35px" w="325px" mr="10" value={isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data[0].roles[0] : ""} />
                  </Flex>
                </FormControl>
              </Flex>
            </Form>
          </Box>

          <Box w="50%">
            <Flex direction="column" pb="20px">
              <Box fontSize="19px" fontWeight="500">Credit</Box>
            </Flex>
            <Flex direction="column" justifyContent="center" alignItems="center">
              <Flex color="#1F2532" fontSize="14px" direction="column" justifyContent="center" alignItems="center">
                <FormControl my="1">
                  <Flex justifyContent='center' alignItems='center'>
                    <Box px="3" w="130px" textAlign="end">
                      <Text fontWeight="500">Level</Text>
                    </Box>
                    <Input disabled fontWeight="300" fontSize="14px" bg="#eaecef" h="35px" w="325px" mr="10" value={isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data[0].level : ""} />
                  </Flex>
                </FormControl>

                <FormControl my="1">
                  <Flex justifyContent='center' alignItems='center'>
                    <Box px="3" w="130px" textAlign="end">
                      <Text fontWeight="500">Currency</Text>
                    </Box>
                    <Input disabled fontWeight="300" fontSize="14px" bg="#eaecef" h="35px" w="325px" mr="10" value={isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data[0].wallet[0].currency : ""} />
                  </Flex>
                </FormControl>

                <FormControl my="1">
                  <Flex justifyContent='center' alignItems='center'>
                    <Box px="3" w="130px" textAlign="end">
                      <Text fontWeight="500">Bet Type</Text>
                    </Box>
                    <Input disabled fontWeight="300" fontSize="14px" bg="#eaecef" h="35px" w="325px" mr="10" value={isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data[0].wallet[0].type : ""} />
                  </Flex>
                </FormControl>

                <FormControl my="1">
                  <Flex justifyContent='center' alignItems='center'>
                    <Box px="3" w="130px" textAlign="end">
                      <Text fontWeight="500">Credit</Text>
                    </Box>
                    <Input disabled fontWeight="300" fontSize="14px" bg="#eaecef" h="35px" w="325px" mr="10" value={isLoading ? '' : data.isError ? 'Error!' : data.data ? data?.data[0].wallet[0].currency + " : " + data?.data[0].wallet[0].credit : ""} />
                  </Flex>
                </FormControl>
              </Flex>
            </Flex>
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

function Whitelist() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("auth-name");
  const { mutate } = useMutation(async (info: InformationProp) => {
    const opt = {
      method: "PUT",
      headers: {
        "auth-token": token || "",
        "auth-name": username || ""
      },
      body: JSON.stringify({
        username: info.username,
        password: info.password,
      }),
    };
    const AddedWhitelist = await fetch(import.meta.env.VITE_DOMAIN_API + import.meta.env.VITE_OPERATOR_PATH, opt).then(
      (res) => res.json()
    );
    return AddedWhitelist;
  }, {
    onSuccess: (data) => {
      if (data.statusCode === 200) {
        queryClient.invalidateQueries(['Whitelist'])
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
  return (
    <>
      <Flex color="#1F2532" fontSize="14px" direction="column" justifyContent="center" alignItems="center">
        <FormControl my="1">
          <Flex justifyContent='center' alignItems='center'>
            <Box px="3" w="130px" textAlign="end">
              <Text fontWeight="500">Whitelist IP</Text>
            </Box>
            <Input fontWeight="300" fontSize="14px" h="35px" w="325px" mr="1" placeholder="WhiteList IP" />
            <Button ml="3" fontSize="15px" color="#fff" bg="#cfa137" _hover={{ bg: "#cfa1377a" }} px="0" h="35px" fontWeight="300">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Flex>
        </FormControl>
      </Flex>
    </>
  )
}

function WhitelistInfo() {
  return (
    <>
      <TableContainer my="3">
        <Table size='sm'>
          <Thead>
            <Tr bg="primary-color1">
              <Th textAlign="center" color="#fff" fontWeight="300">IP</Th>
              <Th textAlign="center" color="#fff" fontWeight="300">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td textAlign="center" fontWeight="300">127.0.0.1</Td>
              <Td textAlign="center" fontWeight="300">
                <Button fontSize="12px" color="#fff" bg="#ff3547" _hover={{ bg: "#ff3820" }} px="0" h="35px" fontWeight="500">
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
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
                <Link href="/app/account/profile">Account</Link>
              </Box>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href="/app/account/profile">profile</Link>
            </BreadcrumbItem>
          </Breadcrumb>
          <Text fontSize="30px" fontWeight="400" mb="1">Profile</Text>
        </Box>
        <Flex bg="#ffff" columnGap="70px" p="9" boxShadow='xl' borderRadius="5px" w="1210px" direction="row">
          <BasicInfo />
        </Flex>
      </Flex>
    </Flex >
  )
}

export default Body
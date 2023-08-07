import { Box, Flex, Text, Tabs, TabList, TabPanels, Tab, TabPanel, FormControl, FormLabel, Input, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td, useToast, Select, FormHelperText } from "@chakra-ui/react"
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
        <Flex direction="column">
          <Flex>
            <Box w="100%">
              <Form>
                <Flex color="#1F2532" fontSize="14px" direction="row" justifyContent="center" alignItems="center">
                  <FormControl>
                    <Flex justifyContent='center' alignItems='center'>
                      <Box px="3" w="130px" textAlign="end">
                        <Text fontWeight="500">Login Name : </Text>
                      </Box>
                      <Field as={Input} name="username" fontWeight="300" fontSize="14px" bg="#eaecef" h="35px" w="300px" />
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <Flex justifyContent='center' alignItems='center'>
                      <Box px="3" w="130px" textAlign="end">
                        <Text fontWeight="500">Currency : </Text>
                      </Box>
                      <Select fontSize="14px" h="35px" w="100px">
                        <option value='option1'>ALL</option>
                        <option value='option1'>THB</option>
                      </Select>
                    </Flex>
                  </FormControl>

                  <Button fontSize="12px" color="#fff" w="90px" h="35px" bg="#cfa137" _hover={{ bg: "#cfa1377a" }} fontWeight="400">
                    Search
                  </Button>

                </Flex>
              </Form>
            </Box>
          </Flex>
        </Flex>
      )
      }
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
                <Link href="/app/account/profile">Management</Link>
              </Box>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Box color="#2F80ED">
                <Link href="/app/account/profile">Members & Agents</Link>
              </Box>
            </BreadcrumbItem>
          </Breadcrumb>
          <Text fontSize="30px" fontWeight="400" mb="1">Members & Agents</Text>
        </Box>
        <Flex bg="#ffff" columnGap="70px" p="9" boxShadow='xl' borderRadius="5px" w="1210px" direction="row">
          <BasicInfo />
        </Flex>
        <TableContainer>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th bg="#0b926c" color="#fff" fontSize="0.8125rem">No</Th>
                <Th bg="#0b926c" color="#fff" fontSize="0.8125rem">Position</Th>
                <Th bg="#0b926c" color="#fff" fontSize="0.8125rem">Login Name</Th>
                <Th bg="#0b926c" color="#fff" fontSize="0.8125rem">Name</Th>
                <Th bg="#0b926c" color="#fff" fontSize="0.8125rem">Currency</Th>
                <Th bg="#0b926c" color="#fff" fontSize="0.8125rem">Level</Th>
                <Th bg="#0b926c" color="#fff" fontSize="0.8125rem">Bet Type</Th>
                <Th bg="#0b926c" color="#fff" fontSize="0.8125rem">Person In Charge</Th>
                <Th bg="#0b926c" color="#fff" fontSize="0.8125rem">Create Date</Th>
                <Th bg="#0b926c" color="#fff" fontSize="0.8125rem">Last login date</Th>
                <Th bg="#0b926c" color="#fff" fontSize="0.8125rem">Last login IP</Th>
                <Th bg="#0b926c" color="#fff" fontSize="0.8125rem">Status</Th>
                <Th bg="#0b926c" color="#fff" fontSize="0.8125rem">Edit</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex >
  )
}

export default Body
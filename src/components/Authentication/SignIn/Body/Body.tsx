import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Text, useToast } from "@chakra-ui/react"
import { useMutation } from "react-query";
import { Field, Form, Formik } from "formik";
import { useLocation } from "wouter";

interface InformationProp {
    username: string;
    password: string;
}

function SignInForm() {

  const toast = useToast();
  const [location, setLocation] = useLocation();

  const { mutate } = useMutation(async (info: InformationProp) => {
    const opt = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: info.username,
        password: info.password,
      }),
    };
    const login = await fetch(import.meta.env.VITE_DOMAIN_API + import.meta.env.VITE_SIGNIN_API, opt).then(
      (res) => res.json()
    );
    return login;
  }, {
    onSuccess: (data) => {
      if (data.success === true) {
        toast({
          title: "เข้าสู่ระบบสำเร็จ",
          description: "",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("auth-name", data.data.username);
        setLocation("/app/dashboard");
      } else if (data.statusCode === 429) {
        toast({
          title: data.error,
          description: data.message,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: data.error.message,
          description: "",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
  })
    return (
        <Formik<InformationProp>
            // isInitialValid={false}
            validate={(values) => {
                if (values.username === "") {
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
                mutate({ username: values.username, password: values.password })
                setSubmitting(false);
            }
            }
        >
            {({ isValid, errors, isSubmitting }) => (
                <Form>
                    <Flex boxShadow='2xl' direction="column" bg="primary-color2" w="400px" p="6" borderBottomRadius="12px">
                        <FormControl>
                            {errors.username && "username"}
                            <FormLabel fontSize="12px" lineHeight="5px" fontWeight="400">Account</FormLabel>
                            <Field bg="#fff" color="#000" as={Input} name="username" />
                        </FormControl>

                        <FormControl mt="5">
                            {errors.password && "password"}
                            <FormLabel fontSize="12.5px" lineHeight="5px" fontWeight="400">Password</FormLabel>
                            <Field bg="#fff" color="#000" as={Input} type="password" name="password" />
                        </FormControl>

                        <Button bg="primary-color1" type="submit" _hover={{ bg: "primary-color6" }} fontWeight="400" mt="6" color="#fff" w="100%" disabled={!isValid} isLoading={isSubmitting}>
                            Sign In
                        </Button>
                        <Text textAlign="center" fontSize="12px" fontWeight="400" color="#333" mt="3">
                            Contact your associate in case you forgot the password or unable to sign in
                        </Text>
                    </Flex>
                </Form>
            )}
        </Formik >
    )
}

function Body() {
    return (
        <Flex alignItems="center" justifyContent="center" bg="primary-color1" w="100vw" h="100vh">
            <Flex direction="column">
                <Flex alignItems="center" pos="relative" justifyContent="center" direction="column" boxShadow='2xl' bg="primary-color1" w="400px" h="180px" p="6" borderTopRadius="12px">
                    <Box pos="absolute" top="0px" right="0px" bg="primary-color8" color="#fff" borderRadius="0 10px" px="2" fontWeight="400wd" fontSize="12px">v 0.0.1</Box>
                    <Image mt="2" src="https://ambimgcdn.co/img/sportsbook/logo_ambking.webp" w="180px" h="autoo" />
                    <Text mt="4" fontWeight="300" fontSize="20px" color="#fff">We are the future of gaming</Text>
                </Flex>
                <SignInForm />
            </Flex>
        </Flex>
    )
}

export default Body
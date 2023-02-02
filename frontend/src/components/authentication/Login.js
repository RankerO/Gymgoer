import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { LockIcon, QuestionOutlineIcon } from '@chakra-ui/icons'
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const navigate = useNavigate();
    const [userID, setUserID] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);


    const submitHandler = async () => {
        setLoading(true);
        if (!userID || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        console.log(userID, password);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/user_login",
                { userID, password },
                config
            );

            // console.log(JSON.stringify(data));
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/user");
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);

        }
    };
    return (
        <VStack spacing="10px">
            <FormControl id="userID" isRequired>
                <FormLabel><QuestionOutlineIcon boxSize={4} /><br />UserID</FormLabel>
                <Input
                    value={userID}
                    type="text"
                    placeholder="Enter your user ID"
                    onChange={(e) => setUserID(e.target.value)}
                />
            </FormControl>

            <FormControl id="password" isRequired>

                <FormLabel><LockIcon boxSize={4} /><br />Password </FormLabel>
                <InputGroup size="md">
                    <Input
                        value={password}
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm"
                            onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>
        </VStack>
    );
};

export default Login;

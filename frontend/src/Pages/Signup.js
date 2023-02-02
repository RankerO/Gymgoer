import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { EmailIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { FaFacebook } from 'react-icons/fa';
import { Text, VStack } from "@chakra-ui/layout";
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userID, setUserID] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);
    const submitHandler = async () => {
        setPicLoading(true);
        if (!name || !email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
        console.log(name, email, password, pic, userID);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user/register",
                {
                    name,
                    email,
                    userID,
                    password,
                    pic,
                },
                config
            );
            console.log(data);
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setPicLoading(false);
            navigate("/signin");
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
        }
    };
    const postDetails = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        // console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "track-places");
            data.append("cloud_name", "dbordvqkr");
            fetch("https://api.cloudinary.com/v1_1/dbordvqkr/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setPicLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
    };

    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo != null) {
        if (userInfo.isAdmin) {
            window.location = "/admin";
        } else {
            window.location = "/user"
        }
    } else {
        return (
            <VStack className="signup" w="25%" spacing="8px">
                <FormControl id="first-name" isRequired>
                    <FormLabel color="black">Name
                    </FormLabel>
                    <Input bg={"white"}
                        placeholder="Enter Your Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel color="black">Email Address</FormLabel>
                    <Input bg={"white"}
                        type="email"
                        placeholder="Enter Your Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl id="userID" isRequired>
                    <FormLabel color="black">User ID</FormLabel>
                    <Input bg={"white"}
                        type="text"
                        placeholder="Enter Your User ID"
                        onChange={(e) => setUserID(e.target.value)}
                    />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel color="black">Password</FormLabel>
                    <InputGroup size="md">
                        <Input bg={"white"}
                            type={show ? "text" : "password"}
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl id="pic">
                    <FormLabel>Upload your Picture</FormLabel>
                    <Input
                        type="file"
                        p={1.5}
                        bg={"white"}
                        accept="image/*"
                        onChange={(e) => postDetails(e.target.files[0])}
                    />
                </FormControl>
                <Button
                    colorScheme="blue"
                    width="100%"
                    color="white"
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                    isloading={picLoading}
                >
                    Sign Up
                </Button>
                <Button style={{ marginTop: 30 }} p="5.5" leftIcon={<EmailIcon />} colorScheme='whiteAlpha' variant='link' color="white">Signup with google</Button>
                <Button leftIcon={<FaFacebook />} colorScheme='facebook' color="white" variant='link'>
                    Signup with  Facebook
                </Button>
                <p color="red">already have account?</p>
                <Link to="/"><Text textAlign="center" fontSize="1xl">Click here to sign in</Text></Link>
            </VStack>
        );
    }
};

export default Signup;
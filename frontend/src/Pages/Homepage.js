import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import { Link } from "react-router-dom";
import AdminLogin from "../components/authentication/AdminLogin"

function Homepage() {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo != null) {
    if (userInfo.isAdmin) {
      window.location = '/admin';
    } else {
      window.location = '/user';
    }
  } else {
    return (
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text textAlign="center" fontSize="4xl" fontFamily="Work sans">
            Test-App
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab>User</Tab>
              <Tab>Admin</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <AdminLogin />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Text marginTop={"8"}>Not sign up yet?</Text>
        <Box
          d="flex"
          textAlign={"center"}
          justifyContent="center"
          p={3}
          bg="white"
          color={"black"}
          m="20px 0 15px 0"
          width={"20%"}
          borderRadius="lg"
          borderWidth="1px"
        >
          <Link to="/signup">Sign Up</Link>
        </Box>
      </Container>
    );
  }
}

export default Homepage;
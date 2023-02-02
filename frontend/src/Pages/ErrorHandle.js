import { Box, Container, Text } from '@chakra-ui/react'
import React from 'react'
import { Link} from 'react-router-dom'

function ErrorHandle() {
  return (
      <Container maxW="xl" centerContent>
          <Box
              d="flex"
              justifyContent="center"
              p={3}
              bg="red"
              w="100%"
              color={"white"}
              m="40px 0 15px 0"
              borderRadius="lg"
              borderWidth="1px"
          >
              <Text textAlign="center" fontSize="4xl" fontFamily="Work sans">
                  PAGE NOT FOUND
              </Text>
          </Box>
          <Box
              d="flex"
              justifyContent="center"
              p={3}
              bg="red"
              w="100%"
              color={"white"}
              m="40px 0 15px 0"
              borderRadius="lg"
              borderWidth="1px">
              <Link to="/">
                <Text textAlign="center" fontSize="2xl">Go to Homepage </Text>
              </Link>
          </Box>
      </Container>
  )
}

export default ErrorHandle

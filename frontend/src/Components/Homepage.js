import React from 'react';

import Login from './Authentication/Login.js';
import SignUp from './Authentication/SignUp.js';

import  {Container, Box, Text, Tabs, Tab, TabPanel, TabPanels, TabList} from '@chakra-ui/react';

const Homepage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box d="flex" justifyContent="center" p={3} bg="white" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px">
        <Text fontSize="4xl" color="black">
          Start a Chat
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="1px">
        
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList mb="1em">
            <Tab width="50%">LOGIN</Tab>
            <Tab width="50%">SIGN UP</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;

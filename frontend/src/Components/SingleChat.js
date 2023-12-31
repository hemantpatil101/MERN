import React from 'react'
import { ChatState } from './context/ChatProvider'
import { Box,IconButton,Text, useDisclosure } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender,getSenderFull } from './ChatLogics';
import ProfileModal from './ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal.js';
import { useState } from 'react';
const SingleChat = ({fetchAgain,setFetchAgain}) => 
{
    const {user,selectedChat,setSelectedChat} = ChatState();
  return (
    <>
       { selectedChat ? (<>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center">
            <IconButton
            display={{base:"flex",md:"none"}}
            icon={<ArrowBackIcon/>}
            onClick={()=>setSelectedChat("")}/>

            {
                

                !selectedChat.isGroupChat ? (<>
                   {getSender(user,selectedChat.users)}
                   <ProfileModal user={getSenderFull(user,selectedChat.users)}/>
                </>)
                : (
                    <>{selectedChat.chatName.toUpperCase()}
                    { <UpdateGroupChatModal fetchAgain={fetchAgain}
                     setFetchAgain={setFetchAgain}/>} 
                    </>
                )
            }

          </Text>
          <Box 
           display="flex" 
           flexDir="column"
           justifyContent="flex-end"
           p={3}
           bg="#E8E8E8"
           w="100%"
           h="100%"
           borderRadius="lg"
           overflowY="hidden">

          </Box>

       </>) : (
         <Box display="flex" alignItems="center" justifyContent="center"h="100%">
            <Text fontSize="3xl" pb={3}>
                Click On a User to Start Conversation
            </Text>

         </Box>
       )}
    </>
  )
}

export default SingleChat
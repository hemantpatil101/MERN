import { Box, IconButton } from '@chakra-ui/react';
import React from 'react'
import { Modal,FormControl,Input,ModalOverlay,ModalFooter,ModalContent,Button,ModalHeader,ModalBody,ModalCloseButton } from '@chakra-ui/react';
import { ChatState } from './context/ChatProvider';
import UserBadgeItem from './UserBadgeItem';
import { ViewIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
const UpdateGroupChatModal = ({fetchAgain,setFetchAgain}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [groupChatName, setGroupChatName] = useState('');
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const toast = useToast();
    
    const {selectedChat,setSelectedChat,user}  = ChatState();

    const handleRemove = async() =>{

    }

    const handleRename = async() => {

        if(!groupChatName)
        return;

        try {
            setRenameLoading(true);
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
            const { data } = await axios.put(
              `/api/chat/rename`,
              {
                chatId: selectedChat._id,
                chatName: groupChatName,
              },
              config
            );
      
            console.log("Data1: ",data);
            //setSelectedChat("");
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
          } catch (error) {
            toast({
              title: "Error Occured!",
              //description: error.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            console.log("Error",error)
            setRenameLoading(false);
          }
          setGroupChatName("");
    }

    const handleSearch = () => {

    }
  return (
    <>
    <IconButton display={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}></IconButton>

    <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
    <ModalHeader
    fontSize="35px"
    display="flex"
    justifyContent="center">{selectedChat.chatName}</ModalHeader>
    <ModalCloseButton />
    <ModalBody display="flex" flexDir="column" alignItems="center">
       <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
          {selectedChat.users.map((u) =>(
            <UserBadgeItem
            key={u._id}
            user={u}
            handlefunction={() => handleRemove(u)}
            />
            
          ))}
       </Box>
       <FormControl display="flex">
        <Input
        placeholder='Chat Name'
        mb={3}
        value={groupChatName}
        onChange={(e) => setGroupChatName(e.target.value)}>
        </Input>
        <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
       </FormControl>
       <FormControl>
         <Input
         placeholder='Add User to Group'
         mb={1}
         onChange={(e)=>handleSearch(e.target.value)}
         />

       </FormControl>
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='red' mr={3} onClick={() => handleRemove(user)}>
        Leave Group
      </Button>
      <Button variant='ghost'>Secondary Action</Button>
    </ModalFooter>
    </ModalContent>
    </Modal>
    </>
  )
}

export default UpdateGroupChatModal
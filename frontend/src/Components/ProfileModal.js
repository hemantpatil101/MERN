import { ViewIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure,Modal,ModalBody,ModalHeader,ModalOverlay,ModalCloseButton,ModalFooter,ModalContent,Button, Image, Text } from '@chakra-ui/react'
import React from 'react'

const ProfileModal = ({user,children}) => {
   
    const {isOpen,onOpen,onClose} = useDisclosure();

  return (
    <div>
        {children ? (
         <span onClick={onOpen}>{children}</span>
        ):(
            <IconButton display={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}/>
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize="40px"
          display="flex"
          justifyContent="center"
          > {user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between">
            <Image
            borderRadius="full"
            boxSize="150px"
            src={user.pic}
            alt={user.name}
            />
            <Text fontSize={{base:"28px",md:"30px"}}>
                Email : {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ProfileModal
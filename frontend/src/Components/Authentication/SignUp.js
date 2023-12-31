import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { FormControl, FormLabel, VStack,Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const SignUp = () => {

    const [name,setName] = useState('John');
    const [email,setEmail] = useState('');
    const [confirmpassword,setConfirmpassword] = useState('');
    const [password,setPassword] = useState('');
    const [pic,setPic] = useState();
    const [show,setShow] = useState(false);
    const [picLoading,setPicLoading] = useState(false);
    const toast = useToast();
    const history = useNavigate();
    const handleClick = () => setShow(!show);
    
     const postDetails = (pic) =>{
      console.log("You have Entered PostDetails")
      setPicLoading(true);
      if(pic === undefined)
      {
         toast({
          title:"Please select an Image\n",
           
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom",
         });
         console.log("Undefined Error !!!");
         return;
      }
      if(pic.type === "image/jpeg" || pic.type==="image/png" || pic.type==="image/jpg")
      {
         const data = new FormData();
         data.append("file",pic);
         data.append("upload_preset","ChatApp");
         data.append("cloud_name","dbhgc3h5i");
         fetch("https://api.cloudinary.com/v1_1/dbhgc3h5i/image/upload",{
          method:"post",
          body:data,
         })
         .then((res)=>res.json())
         .then((data)=>{
          setPic(data.url.toString());
          setPicLoading(false);
          })
          .catch((err)=>{
            console.log(err);
            setPicLoading(false);
          })
      }
      else
      {
        toast({
          title:"Please select an Image\n",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom",
         });

         console.log("Undefined Error 2 !!!");
      }
    }

    const submitHandler = async () =>{

      setPicLoading(true);
      console.log(name,password,email,confirmpassword);
      
      if(!name || !email || !password || !confirmpassword)
      {
        toast({
          title:"Enter Correct Details\n",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom",
        });
        setPicLoading(false);
        return;
      }
      if(password !== confirmpassword)
      {
        toast({
          title:"Password and Confirm Password are not matching\n",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom",
        });
        return;
      }
      
      try{
        const config = {
           headers:{
             "content-type":"application/json",
           },
        }
        const {data} = await axios.post("/api/user",{name,email,password,pic},config);
        
        toast({
          title:"Registration Successful\n",
          status:"success",
          duration:5000,
          isClosable:true,
          position:"bottom",
        });
        localStorage.setItem("userInfo",JSON.stringify(data));

        setPicLoading(false);

        history('/chat');


      }catch (error){
        toast({
          title:"Please select an Image\n",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom",
         });

         setPicLoading(false);
      }
        /*const postDetails = (pics) =>{
            setPicLoading(true);
            return;
        };*/
    };

  return (
    <VStack spacing="10px">

       <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input value={email}
        type="email"
        placeholder="Enter Your Email Address"
        onChange={(e)=>setEmail(e.target.value)}/>
       </FormControl>

       <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
        <Input value={password}
        type={show?"text":"password"}
        placeholder="Enter Password"
        onChange={(e)=>setPassword(e.target.value)}/>
        <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show?"Hide":"Show"}
            </Button>
        </InputRightElement>
        </InputGroup>
       </FormControl>
       
       <FormControl id="confirm password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
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
          accept="image/*"
          onChange={(e)=>{postDetails(e.target.files[0])}}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>



    </VStack>
  )
}

export default SignUp
/*import { Stack, Text, Input, Button, Container, CheckboxGroup, Checkbox } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Register(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/signup', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"email": email, "password":password})
    }).then(() => {
        console.log("POST: " + email)
    })
  })

    return(
    <Container 
    minHeight="100vh"
    direction="column"
    justify="flex-start"
    align="flex-start"
    spacing="10px"
    overflow="hidden"
    bg="#CBD5E0"
    >
    
    <Stack 
    m='200px'
    direction="row" 
    justify="flex-start" 
    align="center" 
    spacing="200px">
      <Text
        fontFamily="Roboto Mono"
        fontWeight="bold"
        fontSize="64px"
        color="#000000"
      >
        VocalAIze
      </Text>
      <form onSubmit={useEffect}>
      <Stack
        paddingX="78px"
        paddingY="50px"
        borderRadius="10px"
        width="676px"
        height="714px"
        maxWidth="100%"
        background="rgba(137, 172, 212, 0.3)"
      >
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="35px"
          color="#000000"
          width="520px"
          height={"0px"}
          maxWidth="100%"
        >
          Create an account
        </Text>
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="15px"
          color="#000000"
          width="254px"
          height="30px"
          maxWidth="100%"
        >
          Already a user?
          <Text ml={'5px'} as={'a'} href="/SignIn">Sign in</Text>
        </Text>
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="20px"
          color="#000000"
          width="254px"
          height="20px"
          maxWidth="100%"
        >
          Email Address:
        </Text>
        <Input
          input type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder= 'Enter your email address'
          size="lg"
          variant="outline"
          isInvalid={false}
          isDisabled={false}
          width="493px"
          height="30px"
          maxWidth="100%"
        />
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="20px"
          color="#000000"
          width="254px"
          height="20px"
          marginTop={"60px"}
          maxWidth="100%"
        >
          Password:
        </Text>
        <Input
          input type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder= 'Enter your password'
          size="lg"
          variant="outline"
          isInvalid={false}
          isDisabled={false}
          width="493px"
          height="30px"
          maxWidth="100%"
        />
        <Button 
        size="lg" 
        variant="solid" 
        bg="lightgrey" 
        width='80px' 
        height='30px'
        mt={'200px'}
        borderRadius={'5px'}
        as={'a'}
        href="/Subscription"
        textDecor={'none'}
        textColor={'black'}
        fontSize={'16px'}
        border={'1px solid black'}>
          Continue
        </Button>
      </Stack>
      {error && <div>{error}</div>}
      </form>
    </Stack>
  </Container>
    );
}
export default Register;
*/

import React, { useState } from 'react';
import {
  Container, Stack, Text, Input, Button
} from '@chakra-ui/react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to register');
    })
    .then(data => {
      console.log("Registration successful", data);
      // Redirect or further action
    })
    .catch(error => {
      console.error("Error:", error);
      setError('Registration failed. Please try again.');
    });
  };

  return (
    <Stack
    minHeight={'130vh'}
    direction="column"
    justify="flex-start" 
    align="center" 
    bg="#CBD5E0"
    >
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="64px"
          color="#000000"
          mt={'20px'}
        >
          VocalAIze
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack
            w='300px'
            p={'50px'}
            direction={'column'}
            justify={'flex-start'}
            align={'flex-start'}
            borderRadius="10px"
            background="rgba(137, 172, 212, 0.3)"
          >
            <Text
              fontFamily="Roboto Mono"
              fontWeight="bold"
              fontSize="25px"
              color="#000000"
              height="0px"
              mt={'0px'}
            >
              Create an account
            </Text><br/>
            <Text
              fontFamily="Roboto Mono"
              fontWeight="bold"
              fontSize="15px"
              color="#000000"
              maxWidth="100%"
            >
              Already a user?<br/>
              <Text as="a" href="/SignIn">Sign in</Text>
            </Text>
            <Text
              fontFamily="Roboto Mono"
              fontWeight="bold"
              fontSize="20px"
              color="#000000"
              height="20px"
              maxWidth="100%"
            >
              Email Address:
            </Text>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email Address'
              size="lg"
              variant="outline"
              width="200px"
              height="30px"
              borderRadius={'8px'}
            />
            <Text
              fontFamily="Roboto Mono"
              fontWeight="bold"
              fontSize="20px"
              color="#000000"
              height="20px"
              marginTop="30px"
              maxWidth="100%"
            >
              Password:
            </Text>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              size="lg"
              variant="outline"
              width="200px"
              height="30px"
              maxWidth="100%"
              borderRadius={'8px'}
            />
            <Button
              type='submit'
              size="lg" 
              variant="solid" 
              bg={'#89ACD4'}  
              px={'7px'}
              height='48px'
              mt={'50px'}
              borderRadius={'5px'}
              as={'a'}
              href="/Subscription"
              textDecor={'none'}
              textColor={'black'}
              fontSize={'16px'}
              border={'1px solid black'}
            >
              Continue
            </Button>
          </Stack>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
      </Stack>
  );
}

export default Register;

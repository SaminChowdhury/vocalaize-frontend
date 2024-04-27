import React, { useState } from 'react';
import {
  Container, Stack, Text, Input, Button, Image, Fade
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import logo from "../images/logo.png"
import Typewriter from '../components/Typewriter';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

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
      navigate('/Subscription');
      
    })
    .catch(error => {
      console.error("Error:", error);
      alert('failed to register');
      setError('Registration failed. Please try again.');
    });
  };

  React.useEffect(() => {
    setIsOpen(true);  // Set open state to true when component mounts
  }, []);

  return (
    <Stack
    minHeight={'100vh'}
    direction="column"
    justify="center"
    align="center"
    bgGradient="linear(to-b, #FFFFFF, #061637)"
  >
    <form onSubmit={handleSubmit}>
      <Fade in={isOpen} transition={{ enter: { duration: 3 } }}>
        <Stack
          m={'20px'}
          w='300px'
          p={'50px'}
          direction='column'
          justify='flex-start'
          align='center'
          borderRadius='20px'
          shadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
          background='#FFFFFF'
        >
          <Image
            boxSize='200px'
            src={logo}
            alt='VocalAIze Logo'
            mt='-30px'
          />
          <Text
            fontFamily="Roboto Mono"
            fontWeight="bold"
            fontSize="25px"
            color="#304289"
            mt="20px"
            textShadow="-0.2px -0.2px 0 #000, 0.2px -0.2px 0 #000, -0.2px 0.2px 0 #000, 0.2px 0.2px 0 #000"
          >
            <Typewriter text="C reate an account" />
          </Text>
          <Text
            fontFamily="Roboto Mono"
            fontWeight="bold"
            fontSize="20px"
            color="#304289"
            mt="20px"
            textShadow="-0.1px -0.1px 0 #000, 0.1px -0.1px 0 #000, -0.1px 0.1px 0 #000, 0.1px 0.1px 0 #000"
          >
            Email Address:
          </Text>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            size="lg"
            variant="outline"
            w='100%'
            mb={'0px'}
            borderRadius="10px"
            shadow="0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"
          />
          <Text
            fontFamily="Roboto Mono"
            fontWeight="bold"
            fontSize="20px"
            color="#304289"
            textShadow="-0.1px -0.1px 0 #000, 0.1px -0.1px 0 #000, -0.1px 0.1px 0 #000, 0.1px 0.1px 0 #000"
          >
            Password:
          </Text>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            size="lg"
            variant="outline"
            w='100%'
            mb={'0px'}
            borderRadius="10px"
            shadow="0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"
          />
           <Text
            fontFamily="Roboto Mono"
            fontWeight="bold"
            fontSize="15px"
            color="#304289"
            mt="10px"
            pb="10px"
          >
            Already a user?{' '}
            <Text as="a" href="/SignIn" color="#3B82F6">
              Sign in
            </Text>
          </Text>
          <Button
        type="submit" 
        size="lg" 
        variant="solid" 
        bg={'#304289'}  
        px={'7px'}
        height='48px'
        width= '200px'
        mt={'40px'}
        borderRadius={'20px'}
        borderStyle={'none'}
        textDecor={'none'}
        textColor={'#ffffff'}
        fontSize={'16px'}
        _hover={{shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);'}}
        >
          Continue
        </Button>
        </Stack>
      </Fade>
    </form>
    {error && <div style={{ color: 'red' }}>{error}</div>}
  </Stack>
);
}
export default Register;

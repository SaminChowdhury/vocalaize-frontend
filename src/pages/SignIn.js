import { Stack, Text, Input, Button, Container, Image, Fade } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import logo from "../images/logo.png"
import Typewriter from '../components/Typewriter';

function SignIn(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform the login request
    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to sign in');
    })
    .then(data => {
        localStorage.setItem('token', data.token); // Store the token
        console.log("Sign in successful");
        // Fetch subscription status using the token
        return fetch('http://localhost:5000/' + data.user_id + '/subscription', {
            method: 'GET',
            headers: { 
                "Content-Type": "application/json",
                "token": `${data.token}` // Assuming token is needed to access the subscription endpoint
            }
        });
    })
    .then(subscriptionResponse => {
        if (subscriptionResponse.ok) {
            return subscriptionResponse.json();
        }
        throw new Error('Failed to retrieve subscription status');
    })
    .then(subscriptionData => {
        if (subscriptionData.subscription_level) {
            navigate('/HomePage'); // Navigate to Home if subscription level exists
        } else {
            navigate('/Subscription'); // Navigate to Subscription page if no subscription level
        }
    })
    .catch(error => {
        console.error('Error:', error);
        setError('Sign in failed. Please try again.');
    });
};

React.useEffect(() => {
  setIsOpen(true);  // Set open state to true when component mounts
}, []);

    return(
      <Stack
      minHeight={'100vh'}
      direction="column"
      justify="center"
      align="center"
      bgGradient="linear(to-b, #FFFFFF, #061637)"
    >
      <Fade in={isOpen} transition={{ enter: { duration: 3 } }}>
        <form onSubmit={handleSubmit}>
          <Stack
            m={'20px'}
            w='300px'
            p={'50px'}
            direction={'column'}
            justify={'flex-start'}
            align={'center'}
            borderRadius="20px"
            shadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
            background= "#FFFFFF"
          >
            <Image
              boxSize={'200px'}
              src={logo}
              alt='VocalAIze Logo'
              mt={'-30px'}
            />
            <Stack spacing={4}>
              <Text
                fontFamily="Times New Roman"
                fontWeight="bold"
                fontSize="25px"
                color="#304289"
                textShadow="-0.2px -0.2px 0 #000, 0.2px -0.2px 0 #000, -0.2px 0.2px 0 #000, 0.2px 0.2px 0 #000"
              >
                <Typewriter text="S ign In" />
              </Text>
              <Stack direction="column" spacing={2} width="100%">
                <Text
                  fontFamily="Times New Roman"
                  fontWeight="semibold"
                  fontSize="20px"
                  color="#304289"
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
                  isInvalid={false}
                  isDisabled={false}
                  w="100%"
                  borderRadius={'10px'}
                  mb={'0px'}
                  shadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
                />
              </Stack>
        <Text
          fontFamily="Times New Roman"
          fontWeight="bold"
          fontSize="20px"
          color="#304289"
          height="20px"
          maxWidth="100%"
          textShadow= '-0.1px -0.1px 0 #000, 0.1px -0.1px 0 #000, -0.1px 0.1px 0 #000, 0.1px 0.1px 0 #000'
        >
          Password:
        </Text>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder= 'Password'
          size="lg"
          variant="outline"
          isInvalid={false}
          isDisabled={false}
          w='100%'
          mb={'0px'}
          borderRadius={'10px'}
          shadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
        />
        <Text
          fontFamily="Times New Roman"
          fontWeight="bold"
          fontSize="15px"
          color="#304289"
          maxWidth="100%"
          height={"0px"}
          mt={'10px'}
          pb={'10px'}
        >
          New User?<br/> 
          <Text
            fontFamily="Times New Roman"
            fontWeight="semibold"
            fontSize="15px"
            color="#304289" // Change the color to a lighter shade or a different color that contrasts well with the background
            maxWidth="100%"
            height={"0px"}
            mt={'10px'}
            pb={'10px'}
            _hover={{ textDecoration: 'underline' }} // Add underline on hover to indicate it's clickable
          >
            <Text
              as={'a'}
              href="/Register"
              color="#3B82F6" // Change the color to a lighter shade or a different color
              textDecoration="none" // Remove default underline
              _hover={{ textDecoration: 'underline' }} // Add underline on hover
            >
              Create an account
  </Text>
</Text>

        </Text>
        <Button
        type="submit" 
        size="lg" 
        variant="solid" 
        bg={'#304289'}  
        px={'7px'}
        height='48px'
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
      </Stack>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </Fade>
    </Stack>
    );
}
export default SignIn;
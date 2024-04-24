import { Stack, Text, Input, Button, Container, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from "../images/logo.png"

function SignIn(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform the login request
    fetch('https://20.9.240.176:5000/login', {
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
        return fetch('https://20.9.240.176:5000/' + data.user_id + '/subscription', {
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
    return(
    
    <Stack
    minHeight={'100vh'}
    direction="column"
    justify="center" 
    align="center" 
    bg="#E7EEFD"
    >
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
        background="rgba(137, 172, 212, 0.3)"
      >
        <Image
            boxSize={'200px'}
            src={logo}
            alt='VocalAIze Logo'
            mt={'-30px'}
            />
        <Stack>
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="25px"
          color="#304289"
          height={"0px"}
          mt={'0px'}
          textShadow= '-0.2px -0.2px 0 #000, 0.2px -0.2px 0 #000, -0.2px 0.2px 0 #000, 0.2px 0.2px 0 #000'
        >
          Sign in
        </Text>
        <Text
          fontFamily="Roboto Mono"
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
          as={'a'} 
          href="/Register"
          >Create an account
          </Text>
        </Text>
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="20px"
          color="#304289"
          maxWidth="100%"
          textShadow= '-0.1px -0.1px 0 #000, 0.1px -0.1px 0 #000, -0.1px 0.1px 0 #000, 0.1px 0.1px 0 #000'
        >
          Email Address:
        </Text>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder= 'Email Address'
          size="lg"
          variant="outline"
          isInvalid={false}
          isDisabled={false}
          w='200px'
          height="30px"
          borderRadius={'10px'}
          mb={'0px'}
          shadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
        />
        <Text
          fontFamily="Roboto Mono"
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
          w='200px'
          height="30px"
          borderRadius={'10px'}
          shadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
        />
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
    </Stack>
    );
}
export default SignIn;

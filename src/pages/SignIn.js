import { Stack, Text, Input, Button, Container, extendTheme } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const breakpoints = {
  base: '0em',
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}

const theme = extendTheme({ breakpoints })

function SignIn(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
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
    return(
    
    <Stack
    minHeight={'130vh'}
    direction="column"
    justify="flex-start" 
    align="center" 
    bg="#CBD5E0">
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
          height={"0px"}
          mt={'0px'}
        >
          Sign in
        </Text><br/>
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="15px"
          color="#000000"
          maxWidth="100%"
        >
          New User?<br/> 
          <Text as={'a'} href="/Register">Create an account</Text>
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
          placeholder= 'Email Address'
          size="lg"
          variant="outline"
          isInvalid={false}
          isDisabled={false}
          w='200px'
          height="30px"
          borderRadius={'8px'}
        />
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="20px"
          color="#000000"
          height="20px"
          marginTop={"30px"}
          maxWidth="100%"
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
          borderRadius={'8px'}
        />
        <Button
        type="submit" 
        size="lg" 
        variant="solid" 
        bg={'#89ACD4'}  
        px={'7px'}
        height='48px'
        mt={'50px'}
        borderRadius={'5px'}
        textDecor={'none'}
        textColor={'black'}
        fontSize={'16px'}
        border={'1px solid black'}>
          Continue
        </Button>
      </Stack>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </Stack>
    );
}
export default SignIn;

import { Stack, Text, Input, Button, Container } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

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
      <form onSubmit={handleSubmit}>
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
          Sign in
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
          New User? 
          <Text ml={'5px'} as={'a'} href="/Register">Create an account</Text>
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
          type="password"
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
              type="submit" 
              size="lg"
              variant="solid"
              bg="lightgrey"
              width='80px'
              height='30px'
              mt='200px'
              borderRadius='5px'
              textDecor='none'
              textColor='black'
              fontSize='16px'
              border='1px solid black'
            >
          Continue
        </Button>
      </Stack>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </Stack>
  </Container>
    );
}
export default SignIn;

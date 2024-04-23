import { Stack, Text, Input, Button, Container, extendTheme } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email, password });
            console.log(response.data);
            // Handle success, maybe redirect to another page
        } catch (error) {
            console.error('Error:', error.response.data);
            // Handle error, display error message to user
        }
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
        as={'a'}
        href="/HomePage"
        textDecor={'none'}
        textColor={'black'}
        fontSize={'16px'}
        border={'1px solid black'}>
          Continue
        </Button>
      </Stack>
      </form>
    </Stack>
    );
}
export default SignIn;
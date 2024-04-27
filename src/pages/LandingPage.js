import { Fade, Stack, Image, Text, Button, useDisclosure } from '@chakra-ui/react';
import logo from "../images/logo.png"
import React from 'react';
import Typewriter from '../components/Typewriter';


export default function LandingPage() {
  
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(true);  // Set open state to true when component mounts
  }, []);

  return (
    <Stack
      minHeight="100vh"
      direction='column'
      justify="center"
      align="center"
      spacing='60px'
      overflow="hidden"
      bg="#E7EEFD"
    >
      <Stack
        direction="column"
        justify="center"
        align="center"
        spacing={'50px'}
      >
        <Fade in={isOpen} transition={{ enter: { duration: 3 } }}>
          <Image
            src={logo}
            alt='VocalAIze Logo'
          />
        </Fade>
        <Text
          fontFamily="Times New Roman"
          fontWeight="semibold"
          fontSize="25px"
          color="#304289"
          maxWidth="100%"
          mt={'-50px'}
        >
        <Typewriter text="E xplore languages with your voice" />
        </Text>
      </Stack>
      <Stack
        direction="row"
        justify="center"
        align="center"
        spacing={'80px'}
      >
      <Fade in={isOpen} transition={{ enter: { duration: 3 } }}>
        <Button 
          size="lg" 
          variant="solid" 
          bg={'#304289'} 
          height="48px" 
          px={'60px'} 
          borderRadius={'25px'} 
          as={'a'}
          textDecor={'none'} 
          href={'/SignIn'}
          textColor={'#ffffff'}
          fontSize={'20px'}
          _hover={{
            shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17th 50px 0 rgba(0,0,0,0.19)'
          }}
        >
          Sign In
        </Button>
        </Fade>
        <Fade in={isOpen} transition={{ enter: { duration: 3 } }}>
          <Button 
            size="lg"
            variant="solid"
            bg={'#304289'} 
            height="48px" 
            px={'60px'} 
            borderRadius={'25px'} 
            as={'a'} 
            textDecor={'none'}
            href={'/Register'}
            textColor={'#ffffff'}
            fontSize={'20px'}
            _hover={{
              shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17th 50px 0 rgba(0,0,0,0.19)'
            }}
          >
            Register
          </Button>
          </Fade>
      </Stack>
    </Stack>
  );
}
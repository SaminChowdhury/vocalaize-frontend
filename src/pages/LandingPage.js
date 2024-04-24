import { Stack, Text, Button, Container, Flex, Box, Image} from '@chakra-ui/react';
import logo from "../images/logo.png"

export default function LandingPage() {
    return(
      
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
            <Image
            src={logo}
            alt='VocalAIze Logo'
            />
            <Text
              fontFamily="Roboto Mono"
              fontWeight="bold"
              fontSize="25px"
              color="#304289"
              maxWidth="100%"
              mt={'-50px'}
            >
              Explore languages with your voice
            </Text>
          </Stack>
          <Stack
            direction="row"
            justify="center"
            align="center"
            spacing={'80px'}
          >
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
            _hover={{shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);'}}
            >
              Sign In
            </Button>
            <Button size="lg"
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
            _hover={{shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);'}}
            >
              Register
            </Button>
          </Stack>
        </Stack>
    );
}

  
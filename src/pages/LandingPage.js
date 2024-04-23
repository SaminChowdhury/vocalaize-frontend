import { Stack, Text, Button, Container, Flex, Box} from '@chakra-ui/react';

export default function LandingPage() {
    return(
      
        <Stack
          minHeight="100vh"
          direction='row'
          justify="center"
          align="center"
          spacing='400px'
          overflow="hidden"
          bg="#CBD5E0"
        >
          <Stack
            direction="column"
            justify="flex-start"
            align="flex-start"
          >
            <Text
              fontFamily="Roboto Mono"
              fontWeight="bold"
              fontSize="64px"
              color="#000000"
              maxWidth="100%"
            >
              VocalAIze
            </Text>
            <Text
              fontFamily="Roboto Mono"
              fontWeight="bold"
              fontSize="24px"
              color="#000000"
              maxWidth="100%"
            >
              Explore languages with your voice
            </Text>
          </Stack>
          <Stack
            direction="column"
            justify="center"
            align="center"
            spacing={'100px'}
            mt={'50px'}
          >
            <Button size="lg" 
            variant="solid" 
            bg={'#89ACD4'} 
            height="48px" 
            px={'10px'} 
            borderRadius={'5px'} 
            as={'a'}
            textDecor={'none'} 
            href={'/SignIn'}
            textColor={'black'}
            border={'1px solid black'}>
              Sign In
            </Button>
            <Button size="lg"
            variant="solid"
            bg={'#89ACD4'} 
            height="48px" 
            px={'7px'} 
            borderRadius={'5px'} 
            as={'a'} 
            textDecor={'none'}
            href={'/Register'}
            textColor={'black'}
            border={'1px solid black'}>
              Register
            </Button>
          </Stack>
        </Stack>
    );
}

  
import { Stack, Text, Button, Container } from '@chakra-ui/react';

export default function LandingPage() {
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
          spacing="200px"
        >
          <Stack
            direction="column"
            justify="flex-start"
            alignContent="flex-start"
            
          >
            <Text
              fontFamily="Roboto Mono"
              fontWeight="bold"
              fontSize="64px"
              color="#000000"
              width="354px"
              height="53px"
              maxWidth="100%"
            >
              VocalAIze
            </Text>
            <Text
              fontFamily="Roboto Mono"
              fontWeight="bold"
              fontSize="24px"
              color="#000000"
              width="507px"
              height="32px"
              maxWidth="100%"
            >
              Explore languages with your voice
            </Text>
          </Stack>
          <Stack
            direction="column"
            justify="flex-start"
            align="flex-start"
            paddingTop={'60px'}
            spacing="84px"
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
      </Container>
      
    );
}

  
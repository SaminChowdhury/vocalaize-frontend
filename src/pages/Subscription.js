import { Stack, Text, Box, Button, Container } from '@chakra-ui/react'

export default function Subscription() {
  return(
  <Container
  minHeight="100vh"
    direction="column"
    justify="flex-start"
    align="center"
    spacing="10px"
    overflow="hidden"
    bg="#CBD5E0"
  >
    <Stack 
    direction="column" 
    justify="flex-start" 
    align="center" 
    spacing="0px"
    mb={'30px'}>
      <Text
        fontFamily="Roboto Mono"
        fontWeight="bold"
        fontSize="64px"
        color="#000000"
        maxWidth="100%"
        textAlign="center"
        mt={'20px'}
      >
        VocalAIze
      </Text>
      <Stack
        direction="row"
        justify="flex-start"
        align="flex-start"
        spacing="200px"
      >
        <Stack
          borderRadius="10px"
          direction="column"
          justify="flex-start"
          align="center"
          overflow="hidden"
          background="rgba(137, 172, 212, 0.3)"
        >
          <Text
            fontFamily="Roboto Mono"
            fontWeight="bold"
            fontSize="32px"
            color="#000000"
            textAlign="center"
            mt={'20px'}
          >
            Free Tier<hr/>
          </Text>
          <Text
            fontFamily="Roboto Mono"
            fontWeight="bold"
            fontSize="25px"
            color="#000000"
          >
            <Box>
            <span>Price: $0.00</span><br/><br/>
            <span>Unlimited Translations</span><br/><br/> 
            <span>Slower Compute</span><br/><br/>
            <span>Ads</span>
            </Box>
          </Text>
          <Button
            size="lg"
            variant="solid"
            borderBottomRadius={'5px'}
            fontSize={'30px'}
            bg={'#89ACD4'}
            width="373px"
            height="97px"
            maxWidth="100%"
            as={'a'}
            href='/HomePage'
            textDecor={'none'}
            textColor={'black'}
            mt={'30px'}
          >
            Select
          </Button>
        </Stack>

        <Stack
          borderRadius="10px"
          direction="column"
          justify="flex-start"
          align="center"
          overflow="hidden"
          background="rgba(137, 172, 212, 0.3)"
        >
          <Text
            fontFamily="Roboto Mono"
            fontWeight="bold"
            fontSize="32px"
            color="#000000"
            textAlign="center"
            mt={'20px'}
          >
            Paid Tier<hr/>
          </Text>
          <Text
            fontFamily="Roboto Mono"
            fontWeight="bold"
            fontSize="25px"
            color="#000000"
          >
            <Box>
            <span>Price: $4.99/mo</span><br/><br/>
            <span>Unlimited Translations</span><br/><br/> 
            <span>Faster Compute</span><br/><br/>
            <span>No Ads</span>
            </Box>
          </Text>
          <Button
            size="lg"
            variant="solid"
            borderBottomRadius={'5px'}
            fontSize={'30px'}
            bg={'#89ACD4'}
            width="373px"
            height="97px"
            maxWidth="100%"
            as={'a'}
            href='/HomePage'
            textDecor={'none'}
            textColor={'black'}
            mt={'30px'}
          >
            Select
          </Button>
        </Stack>
        
      </Stack>
    </Stack>
  </Container>
);
}

import { Stack, Text, Input, Button, Container } from "@chakra-ui/react";

export default function Register(){
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
          Create an account
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
          Already a user?
          <Text ml={'5px'} as={'a'} href="/SignIn">Sign in</Text>
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
          placeholder
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
          placeholder
          size="lg"
          variant="outline"
          isInvalid={false}
          isDisabled={false}
          width="493px"
          height="30px"
          maxWidth="100%"
        />
        <Button 
        size="lg" 
        variant="solid" 
        bg="lightgrey" 
        width='80px' 
        height='30px'
        mt={'200px'}
        borderRadius={'5px'}
        as={'a'}
        href="/Subscription"
        textDecor={'none'}
        textColor={'black'}
        fontSize={'16px'}
        border={'1px solid black'}>
          Continue
        </Button>
      </Stack>
    </Stack>
  </Container>
    );
}
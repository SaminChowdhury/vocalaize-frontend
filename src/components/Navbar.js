import { Stack, Text } from '@chakra-ui/react'

export default function Navbar(){
  return(
  <Stack
    direction="column"
    justify="flex-start"
    align="flex-start"
    spacing="10px"
    overflow="hidden"
    minWidth="100vh"
    background="rgba(137, 172, 212, 0.3)"
    
  >
    <Stack direction="row" justify="flex-start" align="center" h={'70px'}>
      <Text
        fontFamily="Roboto Mono"
        fontWeight="bold"
        fontSize="35px"
        color="#000000"
        maxWidth="100%"
        textAlign="center"
        mx={'30px'}
        p={'5px'}
        as={'a'}
        href='/HomePage'
        textColor={'black'}
        textDecor={'none'}
      >
        VocalAIze
      </Text>
      <Stack
        direction="row"
        justify="flex-start"
        align="center"
      >
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="20px"
          color="#000000"
          textAlign="center"
          mx={'20px'}
          p={'5px'}
          as={'a'}
          href='/About'
          textColor={'black'}
          textDecor={'none'}
        >
          About
        </Text>
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="20px"
          color="#000000"
          textAlign="center"
          mx={'20px'}
          p={'5px'}
          as={'a'}
          href='/Saved'
          textColor={'black'}
          textDecor={'none'}
        >
          Saved
        </Text>
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="20px"
          color="#000000"
          textAlign="center"
          mx={'20px'}
          p={'5px'}
          as={'a'}
          href='/'
          textColor={'black'}
          textDecor={'none'}
        >
          Logout
        </Text>
      </Stack>
    </Stack>
  </Stack>
)
}
import { Stack, Text, Box } from "@chakra-ui/react"
import Navbar from "../components/Navbar"

export default function Saved() {


    return(
    <div>
        <Navbar />
        <Stack
        border={'0.5px black solid'}
        minHeight="100vh"
        direction='column'
        justify="flex-start"
        align="flex-start"
        bg="#E7EEFD"
        spacing={'20px'}
        p={'20px'}
        >
            <Box
            px={'40px'}
            mt={'30px'}
            >
                <Text
                fontFamily="Roboto Mono"
                fontWeight="bold"
                fontSize="32px"
                color="#000000"
                maxWidth="100%"
                >
                Saved Translations
                </Text>
                <Box
                //insert saved translation
                as={'button'}
                w={'100%'}
                h={'50px'}
                bg={'ivory'}
                borderRadius={'10px'}
                fontFamily="Roboto Mono"
                fontWeight="bold"
                fontSize="15px"
                color="#000000"
                maxWidth="100%"
                _hover={{ shadow : '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'}}
                >
                example.wav
                </Box>
            </Box>
        </Stack>
    </div>
    );
}
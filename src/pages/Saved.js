import { Stack, Text, Box } from "@chakra-ui/react"
import NavMenu from "../components/NavMenu"

export default function Saved() {


    return(
    <div>
        <NavMenu />
        <Stack
        w='100%'
        minHeight="100vh"
        direction='column'
        justify="flex-start"
        align="flex-start"
        bg="#CBD5E0"
        spacing={'20px'}
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
                borderRadius={'8px'}
                fontFamily="Roboto Mono"
                fontWeight="bold"
                fontSize="15px"
                color="#000000"
                maxWidth="100%"
                >
                sample.wav
                </Box>
            </Box>
        </Stack>
    </div>
    );
}
import { Stack, Text, Box, extendTheme, Fade } from '@chakra-ui/react';
import NavBar from '../components/Navbar';
import React from 'react';
import Typewriter from '../components/Typewriter';

const breakpoints = {
    base: '0em',
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  }
  
const theme = extendTheme({ breakpoints })

export default function About() {
    const [isOpen, setIsOpen] = React.useState(false);

React.useEffect(() => {
  setIsOpen(true);  // Set open state to true when component mounts
}, []);

    return(
        <div>
        <NavBar />
        <Fade in={isOpen} transition={{ enter: { duration: 3 } }}>
        <Stack
        border={'0.5px black solid'}
        minHeight="100vh"
        direction='column'
        justify="flex-start"
        align="center"
        bg="#FFFFFF"
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
                <Typewriter text= "A bout Us"></Typewriter>
                </Text>
                <Text
                fontFamily="Roboto Mono"
                fontSize="28px"
                color="#000000"
                maxWidth="100%"
                >
                Welcome to VocalAIze, your app for seamless multilingual communication and voice management. 
                At VocalAIze, we're passionate about breaking down language barriers and empowering users to 
                communicate effectively across cultures and languages.
                </Text>
            </Box>
            <Box
            px={'40px'}
            >
                <Text
                fontFamily="Roboto Mono"
                fontWeight="bold"
                fontSize="32px"
                color="#000000"
                maxWidth="100%"
                >
                <Typewriter text= "O ur Mission"></Typewriter>
                </Text>
                <Text
                fontFamily="Roboto Mono"
                fontSize="28px"
                color="#000000"
                maxWidth="100%"
                >
                Our mission is to revolutionize cross-lingual communication by providing innovative tools and 
                features that enhance user experiences and foster meaningful connections. We believe that 
                communication should be effortless, regardless of language or location, and our app is designed 
                to make that vision a reality.
                </Text>
            </Box>
            <Box
            px={'40px'}
            >
                <Text
                fontFamily="Roboto Mono"
                fontWeight="bold"
                fontSize="32px"
                color="#000000"
                maxWidth="100%"
                >
                <Typewriter text="W hat We Offer"></Typewriter>
                </Text>
                <Text
                fontFamily="Roboto Mono"
                fontSize="28px"
                color="#000000"
                maxWidth="100%"
                >
                VocalAIze is a comprehensive web application that combines advanced voice cloning, translation,
                 SMS/email integration, and audio management functionalities in one intuitive platform. Whether 
                 you're a language learner, a globetrotting traveler, or a busy professional, our app has something 
                 for everyone:
                 <ul>
                    <li>
                        Voice Cloning and Translation: Instantly clone your voice and translate it into multiple 
                        languages with unparalleled accuracy. Break down language barriers and communicate 
                        effortlessly with friends, family, and colleagues around the world.
                    </li>
                    <li>
                        SMS/Email Integration: Seamlessly send voice messages via SMS or email, adding a personal touch 
                        to your digital communications. Express yourself more authentically and convey emotions and nuances 
                        that text alone cannot capture.
                    </li>
                    <li>
                        Audio Management: Easily save and organize your audio recordings for language learning, professional 
                        communication, or personal organization. Keep all your voice notes, memos, and conversations in one 
                        convenient location for easy access and reference.
                    </li>
                 </ul>
                </Text>
            </Box>
            <Box
            px={'40px'}
            >
                <Text
                fontFamily="Roboto Mono"
                fontWeight="bold"
                fontSize="32px"
                color="#000000"
                maxWidth="100%"
                >
                <Typewriter text= "G et Started Today"></Typewriter>
                </Text>
                <Text
                fontFamily="Roboto Mono"
                fontSize="28px"
                color="#000000"
                maxWidth="100%"
                >
                Download our app now and unlock a world of possibilities in cross-lingual communication and voice management. Break down 
                language barriers, connect with others on a deeper level, and make every conversation count with VocalAIze.
                </Text>
            </Box>
          </Stack>
          </Fade>
        </div>
    );
}

  
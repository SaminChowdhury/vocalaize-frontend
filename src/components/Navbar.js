import { Flex, Text, Button, Menu, MenuButton, MenuList, MenuItem, Stack, Image} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import logo from "../images/logo.png"

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    console.log('User logged out, localStorage cleared!');
  };

  return (
    <Stack
      direction="row"
      justify="space-between"
      align="center"
      overflow="hidden"
      bg="rgba(137, 172, 212, 0.3)"
      p="10px"
      mb={'1px'}
      border={'0.5px black solid'}
      shadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
    >
      <Stack direction="row" spacing="20px" align="center">
      <Image
            boxSize={'80px'}
            src={logo}
            alt='VocalAIze Logo'
            />
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="20px"
          textAlign="center"
          p="5px"
          as="a"
          href="/HomePage"
          textColor="#304289"
          textDecor="none"
          textShadow= '-0.1px -0.1px 0 #000, 0.1px -0.1px 0 #000, -0.1px 0.1px 0 #000, 0.1px 0.1px 0 #000'
        >
          Home
        </Text>
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="20px"
          textAlign="center"
          p="5px"
          as="a"
          href="/About"
          textColor="#304289"
          textDecor="none"
          textShadow= '-0.1px -0.1px 0 #000, 0.1px -0.1px 0 #000, -0.1px 0.1px 0 #000, 0.1px 0.1px 0 #000'
        >
          About
        </Text>
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="20px"
          textAlign="center"
          p="5px"
          as="a"
          href="/Saved"
          textColor="#304289"
          textDecor="none"
          textShadow= '-0.1px -0.1px 0 #000, 0.1px -0.1px 0 #000, -0.1px 0.1px 0 #000, 0.1px 0.1px 0 #000'
        >
          Saved
        </Text>
      </Stack>
      <Menu>
        <MenuButton
          rightIcon={<ChevronDownIcon />}
          as={Button}
          fontFamily="Roboto Mono"
          fontSize="20px"
          textAlign="center"
          border={'0px'}
          bg={'#304289'} 
          borderRadius={'6px'}
          p="10px"
          mr={'10px'}
          textColor="#ffffff"
          textDecor="none"
          _hover={{shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);'}}
        >
          Profile
        </MenuButton>
        <MenuList>
          <MenuItem 
          onClick={() => navigate('/Subscription')}
          as={Button}
          fontFamily="Roboto Mono"
          fontSize="15px"
          textAlign="center"
          border={'1px black solid'}
          m={'1px'}
          bg={'#304289'}
          borderRadius={'6px'}
          p="10px"
          textColor="#ffffff"
          textDecor="none"
          _hover={{shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);'}}
          >Subscription Tier
          </MenuItem>
          
          <MenuItem 
          onClick={handleLogout}
          as={Button}
          fontFamily="Roboto Mono"
          fontSize="15px"
          textAlign="center"
          border={'1px black solid'}
          m={'1px'}
          bg={'#304289'} 
          borderRadius={'6px'}
          p="10px"
          textColor="#ffffff"
          textDecor="none"
          _hover={{shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);'}}
          >Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
}

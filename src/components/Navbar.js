import { Flex, Text, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    console.log('User logged out, localStorage cleared!');
  };

  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      overflow="hidden"
      bg="rgba(137, 172, 212, 0.3)"
      p="10px"
    >
      <Flex direction="row" spacing="20px" align="center">
      <Text
        fontFamily="Roboto Mono"
        fontWeight="bold"
        fontSize="35px"
        color="#000000"
        textAlign="center"
        p="5px"
        as="a"
        href="/HomePage"
        textColor="black"
        textDecor="none"
      >
        VocalAIze
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="20px"
          color="#000000"
          textAlign="center"
          p="5px"
          as="a"
          href="/About"
          textColor="black"
          textDecor="none"
        >
          About
        </Text>
        <Text
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="20px"
          color="#000000"
          textAlign="center"
          p="5px"
          as="a"
          href="/Saved"
          textColor="black"
          textDecor="none"
        >
          Saved
        </Text>
        </Text>
      </Flex>
      <Menu>
        <MenuButton
          as={Button}
          fontFamily="Roboto Mono"
          fontWeight="bold"
          fontSize="20px"
          color="#000000"
          textAlign="center"
          p="5px"
          textColor="black"
          textDecor="none"
        >
          Profile
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => navigate('/Subscription')}>Subscription Tier</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

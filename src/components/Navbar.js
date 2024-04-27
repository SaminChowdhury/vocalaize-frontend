import logo from "../images/logo.png"
import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from "react";
import {
  Box,
  Flex,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Fade
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { render } from "@testing-library/react";

const Links = [
  { name: 'Home', path: '/Homepage' },
  { name: 'About Us', path: '/About' }
];

const NavLink = ({ children, path }: { children: ReactNode, path: string }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: '#c9cee0', // Change background color on hover
    }}
    to={path}
    display="flex" // Make the link a flex container
    alignItems="center" // Center its children vertically
    justifyContent="center" // Center its children horizontally
  >
    {children}
  </Link>
);

export default function Simple() {
  const { huhWhat, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(true);  // Set open state to true when component mounts
  }, []);
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    console.log('User logged out, localStorage cleared!');
  };

  return (
    <Box borderBottom="1px solid" borderColor="#020024">
    <Fade in={isOpen} transition={{ enter: { duration: 3 } }}>
      <Image
        boxSize={'80px'}
        src={logo}
        alt='VocalAIze Logo'
        ml={'auto'}
        mr={'auto'}
        
      />
      </Fade>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} borderTop="1px solid" borderColor="#020024">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'} justifyContent={'center'} flex={1} pl={125}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map(({ name, path }) => (
                <NavLink key={name} path={path}>{name}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
            </MenuButton>
            <MenuButton
              rightIcon={<ChevronDownIcon />}
              as={Button}
              fontFamily="Times New Roman"
              fontSize="20px"
              textAlign="center"
              border="0px"
              bg="#304289"
              borderRadius="6px"
              p="10px"
              mr="10px"
              textColor="#ffffff"
              textDecor="none"
              _hover={{
                shadow:
                  '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);',
              }}
            >
              Profile
            </MenuButton>
            <MenuList
              bg="transparent"
              border="0px"
              borderRadius="0px"
              _hover={{ bg: 'transparent' }}
            >
              <MenuItem
                onClick={() => navigate('/Subscription')}
                fontFamily="Times New Roman"
                fontSize="15px"
                textAlign="center"
                p="10px"
                textColor="#304289"
                textDecor="none"
                _hover={{ bg: useColorModeValue('#838eb8', '#838eb8') }}
              >
                Subscription Tier
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                fontFamily="Times New Roman"
                fontSize="15px"
                textAlign="center"
                p="10px"
                textColor="#304289"
                textDecor="none"
                _hover={{ bg: useColorModeValue('#838eb8', '#838eb8') }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        {huhWhat ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(({ name, path }) => (
                <NavLink key={name} path={path}>{name}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
        </Flex>
      </Box>
    </Box>
  );
}

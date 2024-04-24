import { Stack, Text, Box, Button, Container, Image } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import logo from "../images/logo.png"

function Subscription() {
  const [subscriptionLevel, setSubscriptionLevel] = useState('');
  const [userId, setUserId] = useState(null);  // State to store user ID
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        fetch('https://20.9.240.176:5000/validate-token', {
            method: 'GET',
            headers: {
                'token': `${token}` // Make sure you use the Authorization header
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                localStorage.clear();
                navigate('/SignIn');
                throw new Error('Token validation failed');
            }
        }).then(data => {
            console.log('Token is valid:', data);
            if (data && data.user_info) {
                setUserId(data.user_info.user_id); // Save user ID from token validation
            }
        }).catch(error => {
            console.error('Error:', error);
            navigate('/SignIn');
        });

    } else {
        navigate('/SignIn');
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userId) {
        fetch(`https://20.9.240.176:5000/user/${userId}/subscription`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subscription_level: subscriptionLevel })
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Failed to select subscription level');
          })
          .then(data => {
            console.log('Subscription level selected:', data);
            navigate('/HomePage');
          })
          .catch(error => {
            console.error('Error selecting subscription level:', error);
          });
    }
  };
  return(

    <Stack 
      minHeight={'100vh'}
      direction="column" 
      justify="flex-start" 
      align="center" 
      bg="#E7EEFD"
    >
      <Image
            boxSize={'200px'}
            src={logo}
            alt='VocalAIze Logo'
            />
      <form onSubmit={handleSubmit}>
        <Stack
          direction="row"
          justify="flex-start"
          align="flex-start"
          spacing="100px"
        >
          {['Free', 'Plus', 'Ultra'].map(tier => (
            <Stack
              key={tier}
              borderRadius="10px"
              direction="column"
              justify="flex-start"
              align="center"
              overflow="hidden"
              background="rgba(137, 172, 212, 0.3)"
              shadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
            >
              <Text
                fontFamily="Roboto Mono"
                fontWeight="bold"
                fontSize="32px"
                color="#304289"
                textAlign="center"
                mt={'20px'}
                textShadow= '-0.2px -0.2px 0 #000, 0.2px -0.2px 0 #000, -0.2px 0.2px 0 #000, 0.2px 0.2px 0 #000'
              >
                {`${tier} Tier`}
              </Text>
              <Box as='div'
              borderBottom={'2px black solid'}
              w={'100px'}
              mb={'50px'}
              />
              <Text
                fontFamily="Roboto Mono"
                fontWeight="bold"
                fontSize="25px"
                color="#304289"
                textShadow= '-0.1px -0.1px 0 #000, 0.1px -0.1px 0 #000, -0.1px 0.1px 0 #000, 0.1px 0.1px 0 #000'
                mt={'-20px'}
                width={'300px'}
              >
                <Box
                dir='column'
                align='center'
                >
                  <span>Price: ${tier === 'Free' ? '0.00' : tier === 'Plus' ? '4.99/mo' : '9.99/mo'}</span><br/><br/>
                  <span>{tier === 'Free' ? '10' : tier === 'Plus' ? '25' : '45'} translations/hour</span><br/><br/> 
                  <span>100+ languages</span><br/><br/>
                  <span>Voice Cloning</span>
                </Box>
              </Text>
              <Button
                type="submit"
                size="lg"
                variant="solid"
                bg={'#304289'}
                px={'7px'}
                height='48px'
                w={'150px'}
                mb={'20px'}
                borderRadius={'20px'}
                borderStyle={'none'}
                textDecor={'none'}
                textColor={'#ffffff'}
                fontSize={'16px'}
                _hover={{shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);'}}
                onClick={() => setSubscriptionLevel(tier)}
              >
                Select
              </Button>
            </Stack>
          ))}
        </Stack>
      </form>
    </Stack>
);
}

export default Subscription;
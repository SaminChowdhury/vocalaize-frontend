import { Stack, Text, Box, Button, Container } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Subscription() {
  const [subscriptionLevel, setSubscriptionLevel] = useState('');
  const [userId, setUserId] = useState(null);  // State to store user ID
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        fetch('http://localhost:5000/validate-token', {
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
        fetch(`http://localhost:5000/user/${userId}/subscription`, {
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
      mb={'30px'}
    >
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
      <form onSubmit={handleSubmit}>
        <Stack
          direction="row"
          justify="flex-start"
          align="flex-start"
          spacing="200px"
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
            >
              <Text
                fontFamily="Roboto Mono"
                fontWeight="bold"
                fontSize="32px"
                color="#000000"
                textAlign="center"
                mt={'20px'}
              >
                {`${tier} Tier`}<hr/>
              </Text>
              <Text
                fontFamily="Roboto Mono"
                fontWeight="bold"
                fontSize="25px"
                color="#000000"
              >
                <Box>
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
                borderBottomRadius={'5px'}
                fontSize={'30px'}
                bg={'#89ACD4'}
                width="373px"
                height="97px"
                maxWidth="100%"
                textDecor={'none'}
                textColor={'black'}
                mt={'30px'}
                onClick={() => setSubscriptionLevel(tier)}
              >
                Select
              </Button>
            </Stack>
          ))}
        </Stack>
      </form>
    </Stack>
  </Container>
);
}

export default Subscription;
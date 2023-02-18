import React from 'react';
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Image,
  HStack,
  Text,
} from 'native-base';
import useHooks from './useHook';

const SignUp = () => {
  const { email, password, handleRegister, handleChangeInEmail, handleChangeInPassword } =
    useHooks();

  return (
    <Center w='100%'>
      <Box safeArea p='2' w='90%' maxW='290' py='6'>
        <Center mb='6'>
          <Image
            size={120}
            borderRadius={100}
            source={{
              uri: 'https://1.bp.blogspot.com/-Xt8woqsnX4Y/XtyDeSqJZHI/AAAAAAAAAq0/u7dZHXo4cjI-BDQ0TzwYA242ZIrTtKTiQCPcBGAYYCw/s0/3335666_s.jpg',
            }}
            alt='Top Image'
          />
        </Center>
        <Heading
          size='lg'
          color='coolGray.800'
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight='semibold'
        >
          筋トレカレンダー
        </Heading>
        <Heading
          mt='1'
          color='coolGray.600'
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight='medium'
          size='xs'
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt='5'>
          <FormControl>
            <FormControl.Label>メールアドレス</FormControl.Label>
            <Input
              onChangeText={(value: string) => {
                handleChangeInEmail(value);
              }}
              value={email}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>パスワード</FormControl.Label>
            <Input
              type='password'
              onChangeText={(value: string) => {
                handleChangeInPassword(value);
              }}
              value={password}
            />
          </FormControl>
          <Button mt='2' bg='rose.400' onPress={handleRegister}>
            Sign up
          </Button>
          <HStack mt='6' justifyContent='center'>
            <Text
              fontSize='sm'
              color='coolGray.600'
              _dark={{
                color: 'warmGray.200',
              }}
            >
              ログインは
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              href={''}
            >
              こちら
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default SignUp;

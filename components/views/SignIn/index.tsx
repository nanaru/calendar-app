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
  HStack,
  Text,
  Image,
} from 'native-base';
import useHooks from './useHook';
const SignIn = () => {
  const {
    email,
    password,
    handleSignIn,
    handleChangeInEmail,
    handleChangeInPassword,
    handleLinkToSignUp,
  } = useHooks();
  return (
    <Center w='100%'>
      <Box safeArea p='2' py='6' w='90%' maxW='290'>
        <Heading
          size='lg'
          fontWeight='600'
          color='coolGray.800'
          _dark={{
            color: 'warmGray.50',
          }}
        >
          筋トレカレンダー
        </Heading>
        <Heading
          mt='1'
          _dark={{
            color: 'warmGray.200',
          }}
          color='coolGray.600'
          fontWeight='medium'
          size='xs'
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt='5'>
          <FormControl>
            <FormControl.Label>メールアドレス</FormControl.Label>
            <Input
              onChangeText={(value: string) => {
                handleChangeInEmail(value);
              }}
              value={email}
              keyboardType='email-address'
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
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf='flex-end'
              mt='1'
            >
              パスワード忘れた方はこちら
            </Link>
          </FormControl>
          <Button mt='2' bg='rose.400' onPress={handleSignIn}>
            Sign in
          </Button>
          <HStack mt='6' justifyContent='center'>
            <Text
              fontSize='sm'
              color='coolGray.600'
              _dark={{
                color: 'warmGray.200',
              }}
            >
              新規登録は
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={handleLinkToSignUp}
            >
              こちら
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default SignIn;

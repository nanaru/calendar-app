import React from 'react';
import { Center, Box, VStack, FormControl, Input, Link, Button, HStack, Text } from 'native-base';
import Loading from 'components/templates/Loading';
import useHooks from './useHook';

const SignUp = () => {
  const {
    email,
    password,
    isValidQuery,
    handleRegister,
    handleChangeInEmail,
    handleChangeInPassword,
    handleLinkToSignIn,
  } = useHooks();

  return (
    <>
      {/* ローディングコンポーネント */}
      <Loading isLoading={isValidQuery} />
      <Center w='100%'>
        <Box safeArea p='2' w='90%' maxW='290' py='6'>
          <VStack space={3}>
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
            <Button mt='6' bg='#33B7D3' onPress={handleRegister}>
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
                onPress={() => handleLinkToSignIn()}
              >
                こちら
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </>
  );
};

export default SignUp;

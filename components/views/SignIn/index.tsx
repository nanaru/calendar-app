import React from 'react';
import { Center, Box, VStack, FormControl, Input, Link, Button, HStack, Text } from 'native-base';
import Loading from 'components/templates/Loading';
import useHooks from './useHook';
const SignIn = () => {
  const {
    email,
    password,
    isValidQuery,
    handleSignIn,
    handleChangeInEmail,
    handleChangeInPassword,
    handleLinkToSignUp,
  } = useHooks();
  return (
    <>
      {/* ローディングコンポーネント */}
      <Loading isLoading={isValidQuery} />
      <Center w='100%'>
        <Box safeArea p='2' py='6' w='90%' maxW='290'>
          <VStack space={3}>
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
            </FormControl>
            <Button mt='6' bg='#33B7D3' onPress={handleSignIn}>
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
    </>
  );
};

export default SignIn;

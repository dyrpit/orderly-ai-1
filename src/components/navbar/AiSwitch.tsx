import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { callGPT } from '@util/api-calls.ts';
import { TPrompt } from '@/types/prompt.ts';
import {
  setIsNotWaitingForResponse,
  setIsWaitingForResponse,
  toggleSwitch
} from '@/redux/features/gpt/gptSlice';
import { fetchProducts } from '@/redux/features/products/productsSlice.ts';
import { fetchCategories } from '@/redux/features/categories/categoriesSlice.ts';
import { Box, Flex, Text } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { type TCategory } from '@/types/category';
import { type TProduct } from '@/types/product';
import toast from 'react-hot-toast';

export const AiSwitch = () => {
  const dispatch = useAppDispatch();
  const isWaitingForResponse = useAppSelector(
    (state) => state.gpt.isWaitingForResponse
  );
  const isSwitchActive = useAppSelector((state) => state.gpt.isSwitchActive);

  let promptGPT: TPrompt[];

  const toggleSwitchHandle = () => {
    dispatch(toggleSwitch());

    if (!isWaitingForResponse && !isSwitchActive) {
      console.log('API Call sended');
      getDataFromOpenAI();
    }
  };

  const getDataFromOpenAI = async () => {
    try {
      dispatch(setIsWaitingForResponse());
      const response = await fetch('../../../prompt.json');
      promptGPT = await response.json();

      const res = await callGPT(promptGPT[0].text);
      const data = JSON.parse(res.data.choices[0].message.content);

      const { categories, products } = data;

      fetchDataFromAPI({ categories, products });

      toast.success('Application generated with OpenAI API');
      dispatch(setIsNotWaitingForResponse());
      isSwitchActive && dispatch(toggleSwitch());
    } catch (error) {
      toast.error('Something went wrong, check console.');
      console.log(error);
    } finally {
      dispatch(setIsNotWaitingForResponse());
      !isSwitchActive && dispatch(toggleSwitch());
    }
  };

  const fetchDataFromAPI = ({ categories, products }: {
    categories: TCategory[];
    products: TProduct[];
  }) => {
    dispatch(fetchCategories(categories));
    dispatch(fetchProducts(products));
  };

  return (
    <Flex
      w='fit-content'
      backgroundColor='bg.counter'
      py={2}
      px={2}
      h={10}
      gap={6}
      justify='space-between'
      alignItems='center'
      borderRadius={40}
      _hover={{ cursor: 'pointer' }}
      onClick={toggleSwitchHandle}
    >
      <Text
        color={isSwitchActive ? 'text.primary' : 'text.secondary'}
        fontSize={{ base: 13, md: 16 }}
        transition='all 0.2s ease-out'
      >
        Build App with chatGPT
      </Text>
      <Box
        position='relative'
        backgroundColor='bg.secondary'
        w={20}
        h={8}
        p={1}
        borderRadius={40}
        transition='all 0.2s ease-out'
      >
        <Flex
          position='absolute'
          borderRadius={99}
          w='fit-content'
          h='fit-content'
          justify='center'
          alignItems='center'
          backgroundColor='bg.counter'
          p={1}
          sx={{
            transform: isSwitchActive ? 'translateX(200%)' : 'translateX(0px)'
          }}
          transition='all 0.2s ease-out'
        >
          <StarIcon
            color={isSwitchActive ? 'text.primary' : 'bg.secondary'}
            w={4}
            h={4}
            transition='all 0.2s ease-out'
          />
        </Flex>
      </Box>
    </Flex>
  );
};

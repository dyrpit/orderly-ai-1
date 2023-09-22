import { Box, Flex, Heading } from '@chakra-ui/layout';
import ProductDetailRadio from './ProductDetailRadio';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Select } from '@chakra-ui/select';
import { Button } from '@chakra-ui/button';
import { useState } from 'react';
import { addProduct } from '@/redux/features/products/productsSlice';

export const AddNewProduct = () => {
  const categories = useAppSelector((state) => state.categories);
  const appDis = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [website, setWebsite] = useState('');
  const [video, setVideo] = useState('');
  const [paid, setPaid] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const [lastProductId, setLastProductId] = useState<number>(30);

  const generateProductId = () => {
    const newId = lastProductId + 1;
    setLastProductId(newId);
    return newId;
  };

  const addNewProduct = () => {
    const newId = generateProductId();
    appDis(
      addProduct({
        id: newId,
        name: productName,
        category: selectedCategory,
        websiteURL: website,
        videoURL: video,
        cost: paid.toString(),
        description: productDescription,
      }),
    );
  };

  const resetValues = () => {
    setSelectedCategory('');
    setProductName('');
    setWebsite('');
    setVideo('');
    setPaid('');
    setProductDescription('');
  };

  const onSaveClick = (e) => {
    e.preventDefault();

    if (
      selectedCategory &&
      productName &&
      website &&
      video &&
      paid !== '' &&
      productDescription
    ) {
      addNewProduct();
      resetValues();
    } else {
      alert('Wszystkie pola muszą być wypełnione!');
    }
  };

  return (
    <Flex
      flexDirection='column'
      bg='bg.secondary'
      minH='300px'
      borderRadius='xl'
      direction={{ base: 'column', md: 'row' }}
      overflow='hidden'
      p={{ base: 0, md: 4 }}
    >
      <Box>
        <Heading
          color='text.secondary'
          fontSize='28px'
          textAlign='center'
          justifyContent='center'
          fontWeight='500'
          p={3}
        >
          Add new category
        </Heading>
      </Box>
      <FormControl>
        <Flex direction={{ base: 'column', md: 'row' }} w='100%'>
          <Box flex='1' display='flex' flexDirection='column' p={5}>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder='Select category'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id}>{category.categoryName}</option>
              ))}
            </Select>
            <Box>
              <FormLabel>Product name</FormLabel>
              <Input
                placeholder='Insert product name'
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
              />
            </Box>
            <FormLabel>Website</FormLabel>
            <Input
              placeholder='Insert URL'
              onChange={(e) => setWebsite(e.target.value)}
              value={website}
            />
            <FormLabel>Video</FormLabel>
            <Input
              placeholder='Insert URL'
              onChange={(e) => setVideo(e.target.value)}
              value={video}
            />
            <FormLabel>Select price</FormLabel>
            <ProductDetailRadio paid={paid} setPaid={setPaid} />
          </Box>
          <Box
            flex='1'
            display='flex'
            flexDirection='column'
            p={5}
            position='relative'
          >
            <FormLabel>Product description</FormLabel>
            <Input
              placeholder='Insert description'
              h='100px'
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
            />
            <Button
              bgColor='transparent'
              color='text.primary'
              w='40%'
              outline='none'
              border='1px solid'
              padding='30px 60px'
              fontSize='25px'
              alignSelf='flex-end'
              _hover={{ bg: 'bg.primary' }}
              onClick={onSaveClick}
            >
              Save
            </Button>
          </Box>
        </Flex>
      </FormControl>
    </Flex>
  );
};

import { Box, Flex, Heading } from '@chakra-ui/layout';
import ProductDetailRadio from './ProductDetailRadio';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Select } from '@chakra-ui/select';
import { Button } from '@chakra-ui/button';
import { useState } from 'react';
import { addProduct } from '@/redux/features/products/productsSlice';
import toast from 'react-hot-toast';
import { formLabelStyles, inputStyles } from './addnewProductStyle';

export const AddNewProduct = () => {
  const categories = useAppSelector((state) => state.categories);
  const products = useAppSelector((state) => state.products);
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
    const isProductExist = products.some(
      (product) => product.name === productName,
    );

    if (isProductExist) {
      toast.error('A product with this name already exists!');
      return;
    }

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
    resetValues();
    toast.success('New product added!');
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
      toast.error('All fields must be completed!');
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
      color='text.secondary'
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
          Add new product
        </Heading>
      </Box>
      <FormControl>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          w='100%'
          position='relative'
        >
          <Box
            flex='1'
            display='flex'
            flexDirection='column'
            p={5}
            alignItems='left'
            justifyContent='space-between'
          >
            <FormLabel style={formLabelStyles}>Category</FormLabel>
            <Select
              color='#FFFFFF40'
              style={inputStyles}
              placeholder='Select category'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id}>{category.categoryName}</option>
              ))}
            </Select>
            <FormLabel style={formLabelStyles}>Product name</FormLabel>
            <Input
              placeholder='Insert product name'
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              style={inputStyles}
            />
            <FormLabel style={formLabelStyles}>Website</FormLabel>
            <Input
              placeholder='Insert URL'
              onChange={(e) => setWebsite(e.target.value)}
              value={website}
              style={inputStyles}
            />
            <FormLabel style={formLabelStyles}>Video</FormLabel>
            <Input
              placeholder='Insert URL'
              onChange={(e) => setVideo(e.target.value)}
              value={video}
              style={inputStyles}
            />
            <FormLabel style={formLabelStyles}>Select price</FormLabel>
            <ProductDetailRadio paid={paid} setPaid={setPaid} />
          </Box>
          <Box
            flex='1'
            display='flex'
            flexDirection='column'
            p={5}
            justifyContent='space-between'
          >
            <Box>
              <FormLabel style={formLabelStyles}>Product description</FormLabel>
              <Input
                placeholder='Insert description'
                h='100px'
                style={inputStyles}
                onChange={(e) => setProductDescription(e.target.value)}
                value={productDescription}
              />
            </Box>
            <Button
              bgColor='transparent'
              color='text.primary'
              w='40%'
              outline='none'
              border='1px solid'
              padding='30px 60px'
              marginTop='20px'
              fontSize='25px'
              alignSelf='flex-end'
              _hover={{ bg: 'bg.gray' }}
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

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  deleteProduct,
  editProduct,
} from '@/redux/features/products/productsSlice';
import {
  Flex,
  VStack,
  Text,
  SimpleGrid,
  Grid,
  GridItem,
  Image,
  Box,
  Tooltip,
  Input,
  Button,
  Textarea,
  Select,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { type TCategory } from '@/types/category';

import playBtnIcon from '@assets/play-btn.svg';
import notFoundProductInfoIcon from '@assets/not-found-product-info.svg';
import notFoundVideoIcon from '@assets/not-found-video-icon.svg';
import toast from 'react-hot-toast';

const MAX_DESCRIPTION_LENGTH = 50;

export const ProductCard = () => {
  const products = useAppSelector((state) => state.products);
  const categories = useAppSelector((state) => state.categories);
  const { categoryName, productName } = useParams();

  const details = products.find(
    (p) => p.category === categoryName && p.name === productName,
  );

  const [editedProduct, setEditedProduct] = useState({ ...details });

  const [editMode, setEditMode] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isUserLoggenIn = useAppSelector((state) => state.user.isUserLoggedIn);
  const token = sessionStorage.getItem('token');
  const isAdmin = token && JSON.parse(token).role === 'admin';

  if (!details)
    return (
      <Text textAlign='center' fontSize={48}>
        Product not found
      </Text>
    );

  const deleteProductHandler = () => {
    dispatch(deleteProduct({ id: details.id }));
    toast.success('Product deleted');
    navigate(`/category/${details.category}`);
  };

  const editModeHandle = () => {
    setEditMode(true);
  };

  const handleInputChange = <
    T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  >(
    e: React.ChangeEvent<T>,
  ) => {
    const { name, value } = e.target;
    setEditedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSendClick = () => {
    dispatch(editProduct(editedProduct));
    toast.success('Product updated');
    navigate(`/category/${editedProduct.category}/${editedProduct.name}`);
    setEditMode(false);
  };

  return (
    <Flex
      bg='bg.secondary'
      minH='300px'
      borderRadius='xl'
      direction={{ base: 'column', lg: 'row-reverse' }}
      align='start'
      justify='center'
      overflow='hidden'
      gap={4}
      p={{ base: 0, md: 4 }}
    >
      <Flex
        direction={{ base: 'column-reverse', lg: 'column' }}
        w='100%'
        h='100%'
        gap={4}
      >
        {isUserLoggenIn && (
          <Flex
            mr={{ base: 2, md: 0 }}
            mt={{ base: 2, md: 0 }}
            alignSelf={{ base: 'end', lg: 'end' }}
            justifyContent='center'
            direction={{ base: 'row', lg: 'row' }}
            gap={{ base: 4 }}
          >
            {editMode && (
              <Button
                variant='outline'
                borderColor='text.primary'
                color='text.primary'
                alignSelf={{ base: 'end' }}
                onClick={handleSendClick}
              >
                Save
              </Button>
            )}
            <EditIcon
              alignSelf={{ lg: 'end' }}
              w={{ base: 7, md: 8 }}
              h={{ base: 7, md: 8 }}
              _hover={{ color: 'text.primary', cursor: 'pointer' }}
              color={editMode ? 'text.primary' : 'text.dark'}
              transition='all 0.2s ease-in-out'
              onClick={editModeHandle}
            />
            {isAdmin && (
              <DeleteIcon
                alignSelf={{ lg: 'end' }}
                w={{ base: 7, md: 8 }}
                h={{ base: 7, md: 8 }}
                _hover={{ color: 'text.primary', cursor: 'pointer' }}
                color='text.dark'
                transition='all 0.2s ease-in-out'
                onClick={deleteProductHandler}
              />
            )}
          </Flex>
        )}
        <Grid
          placeItems='center'
          bg={details.websiteURL ? 'bg.gray' : 'bg.lightGray'}
          w='100%'
          h={{ base: '300px', md: '350px' }}
          alignSelf={{ md: 'start' }}
          borderTopRadius='2xl'
          borderBottomRadius={{ base: 'none', md: '2xl' }}
        >
          {details.websiteURL ? (
            <RenderPlayButtonIcon />
          ) : (
            <RenderNotFoundVideoIcon />
          )}
          {editMode && (
            <Input
              type='text'
              value={editedProduct.videoURL}
              color='text.editInput'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
            />
          )}
        </Grid>
      </Flex>
      <VStack w='100%' p={{ base: 4, md: 0 }}>
        <SimpleGrid columns={2} spacing={6} w='100%' alignItems='start'>
          <ProductInfo
            label='name'
            value={editedProduct.name}
            isEditModeActive={editMode}
            handleInputChange={handleInputChange}
          />
          <RenderCategoryInfo
            label='category'
            value={editedProduct.category}
            isEditModeActive={editMode}
            handleInputChange={handleInputChange}
            categories={categories}
          />
          <ProductInfo
            label='website'
            value={editedProduct.websiteURL}
            isEditModeActive={editMode}
            handleInputChange={handleInputChange}
          />
          <ProductInfo
            label='cost'
            value={editedProduct.cost}
            isEditModeActive={editMode}
            handleInputChange={handleInputChange}
          />
          <ProductInfo
            label='description'
            value={editedProduct.description}
            isEditModeActive={editMode}
            handleInputChange={handleInputChange}
            isFull={
              !!details.description &&
              details.description.length > MAX_DESCRIPTION_LENGTH
            }
          />
        </SimpleGrid>
      </VStack>
    </Flex>
  );
};

const RenderCategoryInfo = ({
  label,
  value,
  isEditModeActive,
  handleInputChange,
  categories,
}: {
  label: string;
  value?: string;
  isEditModeActive?: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: TCategory[];
}) => {
  return (
    <>
      <Text
        as={GridItem}
        color='text.primary'
        fontSize={22}
        fontWeight='bold'
        textTransform='capitalize'
        colSpan={1}
      >
        {label}:
      </Text>
      <Box as={GridItem} colSpan={1}>
        {value && !isEditModeActive && (
          <Text
            color='text.secondary'
            fontSize={16}
            textAlign='justify'
            alignSelf='center'
            noOfLines={{ base: 0, md: 3 }}
          >
            {value}
          </Text>
        )}
        {isEditModeActive && (
          <Select
            value={value}
            onChange={(e) => handleInputChange(e)}
            name='category'
            color='text.editInput'
          >
            {categories.map((category) => (
              <option key={category.id} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </Select>
        )}
      </Box>
    </>
  );
};

const ProductInfo = ({
  label,
  value,
  isFull,
  isEditModeActive,
  handleInputChange,
}: {
  label: string;
  value?: string;
  isFull?: boolean;
  isEditModeActive?: boolean;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}) => {
  return (
    <>
      <Text
        as={GridItem}
        color='text.primary'
        fontSize={22}
        fontWeight='bold'
        textTransform='capitalize'
        colSpan={isFull ? 2 : 1}
      >
        {label}:
      </Text>
      <Box as={GridItem} colSpan={isFull ? 2 : 1}>
        {value ? (
          <RenderValue
            value={value}
            showTooltip={isFull}
            isEditModeActive={isEditModeActive}
            handleInputChange={handleInputChange}
            name={label.toLowerCase()}
          />
        ) : (
          <RenderNotFoundValueIcon />
        )}
      </Box>
    </>
  );
};

const RenderValue = ({
  value,
  showTooltip,
  isEditModeActive,
  handleInputChange,
  name,
}: {
  value: string;
  showTooltip?: boolean;
  isEditModeActive?: boolean;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  name: string;
}) => {
  if (showTooltip)
    if (isEditModeActive)
      return (
        <Textarea
          name={name}
          value={value}
          w='100%'
          minH={{ base: 100, lg: 120 }}
          color='text.editInput'
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleInputChange(e)
          }
        />
      );

  if (!isEditModeActive)
    return (
      <Tooltip
        label={value}
        color='text.secondary'
        bg='bg.primary'
        lineHeight={1.314}
        p={4}
        borderRadius='xl'
        placement='top-start'
      >
        <Text
          color='text.secondary'
          fontSize={16}
          textAlign='justify'
          alignSelf='center'
          noOfLines={{ base: 0, md: showTooltip ? 2 : 0 }}
        >
          {value}
        </Text>
      </Tooltip>
    );

  if (isEditModeActive)
    return (
      <Input
        type='text'
        name={name}
        value={value}
        w='100%'
        color='text.editInput'
        onChange={(e) => handleInputChange(e)}
      />
    );

  return (
    <Text
      color='text.secondary'
      fontSize={16}
      textAlign='justify'
      alignSelf='center'
      noOfLines={{ base: 0, md: 3 }}
    >
      {value}
    </Text>
  );
};

const RenderNotFoundValueIcon = () => {
  return (
    <Image src={notFoundProductInfoIcon} alt='not found product info icon' />
  );
};

const RenderPlayButtonIcon = () => {
  return <Image src={playBtnIcon} alt='Play btn icon' />;
};

const RenderNotFoundVideoIcon = () => {
  return <Image src={notFoundVideoIcon} alt='not found video icon' />;
};

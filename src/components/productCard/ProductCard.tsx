import { useParams } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import {
  Flex,
  VStack,
  Text,
  SimpleGrid,
  Grid,
  GridItem,
  Image,
  Box,
  Tooltip
} from '@chakra-ui/react';

import notFoundProductInfoIcon from '@assets/not-found-product-info.svg';
import notFoundVideoIcon from '@assets/not-found-video-icon.svg';

const MAX_DESCRIPTION_LENGTH = 50;

export const ProductCard = () => {
  const { categoryName, productName } = useParams();

  const products = useAppSelector((state) => state.products);

  const details = products.find(
    (p) => p.category === categoryName && p.name === productName
  );

  if (!details)
    return (
      <Text textAlign='center' fontSize={48}>
        Product not found
      </Text>
    );

  const arr: string[] | undefined = details.videoURL?.split(' ');
  let videoId: string | undefined;

  const getId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return 'error';
    }
  };

  if (arr && (arr[0] !== undefined)) {
    const tempVideo = (arr && arr[0].split('"')[0]) && arr[0].split('"')[0];
    console.log(tempVideo);
    videoId = getId(tempVideo);
  }

  return (
    <Flex
      bg='bg.secondary'
      minH='300px'
      borderRadius='xl'
      direction={{ base: 'column', lg: 'row-reverse' }}
      align='center'
      justify='center'
      overflow='hidden'
      gap={4}
      p={{ base: 0, md: 4 }}
    >
      <Grid
        placeItems='center'
        bg={details.websiteURL ? 'bg.gray' : 'bg.lightGray'}
        w='100%'
        h={{ base: '300px', md: '350px' }}
        alignSelf={{ md: 'start' }}
        borderTopRadius='2xl'
        borderBottomRadius={{ base: 'none', md: '2xl' }}
      >
        {details.videoURL && videoId ? (
          <iframe
            width='560'
            height='315'
            src={`//www.youtube.com/embed/${videoId}`}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          ></iframe>
        ) : (
          <RenderNotFoundVideoIcon />
        )}
      </Grid>
      <VStack w='100%' p={{ base: 4, md: 0 }}>
        <SimpleGrid columns={2} spacing={6} w='100%' alignItems='start'>
          <ProductInfo label='name' value={details.name} />
          <ProductInfo label='category' value={details.category} />
          <ProductInfo label='website' value={details.websiteURL} />
          <ProductInfo label='cost' value={details.cost} />
          <ProductInfo
            label='description'
            value={details.description}
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

const ProductInfo = ({
                       label,
                       value,
                       isFull
                     }: {
  label: string;
  value?: string;
  isFull?: boolean;
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
      <Box as={GridItem} colSpan={isFull ? 2 : 1} color='text.secondary'>
        {value ? (
          value.includes('http') ? (
            <a href={value}>{value}</a>
          ) : (
            <RenderValue value={value} showTooltip={isFull} />
          )
        ) : (
          <RenderNotFoundValueIcon />
        )}
      </Box>
    </>
  );
};

const RenderValue = ({
                       value,
                       showTooltip
                     }: {
  value: string;
  showTooltip?: boolean;
}) => {
  if (showTooltip)
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

const RenderNotFoundVideoIcon = () => {
  return <Image src={notFoundVideoIcon} alt='not found video icon' />;
};

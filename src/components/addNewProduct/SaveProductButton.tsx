import { Button } from '@chakra-ui/button';


export const SaveProductButton = () => {
  return (
    <Button
      bgColor='transparent'
      color='text.primary'
      w='40%'
      outline='none'
      border='1px solid '
      padding='30px 60px'
      m='10px'
      fontSize='25px'
      alignSelf='flex-end'
      marginRight='10'
      _hover={{ bg: 'bg.primary' }}
    >
      Save
    </Button>
  );
};

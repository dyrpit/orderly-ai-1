import { Button, ButtonProps, Image } from '@chakra-ui/react';

interface GenericButtonProps extends ButtonProps {
  size?: 'small' | 'medium' | 'large';
  label: string;
  borderRadius?: any;
  icon?: string;
  isMobile?: boolean;
  borderBottom?: string;
}

const GenericButton = ({
  size = 'medium',
  label,
  icon,
  isMobile,
  ...rest
}: GenericButtonProps) => {
  let buttonSize = 'md';

  if (size === 'small') {
    buttonSize = 'sm';
  } else if (size === 'large') {
    buttonSize = 'lg';
  }

  const buttonStyles = {
    color: '#64ffda',
  };
  return (
    <Button
      backgroundColor={isMobile ? 'transparent' : '#d9d9d926'}
      size={isMobile ? '100%' : buttonSize}
      borderRadius={isMobile ? 'none' : '40px'}
      style={buttonStyles}
      pb={isMobile ? 1 : 'none'}
      borderBottom={isMobile ? '1px solid #64FFDA' : 'none'}
      {...rest}
    >
      {label}
      {size === 'large' && icon && (
        <Image src={icon} w='30px' h='30px' ml='15px' alt="ChatGPT icon" />
      )}
    </Button>
  );
};

export default GenericButton;

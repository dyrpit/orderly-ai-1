import { Button, ButtonProps, Image } from "@chakra-ui/react";

interface GenericButtonProps extends ButtonProps {
  size?: "small" | "medium" | "large";
  label: string;
  borderRadius?: any;
  icon?: string;
}

const GenericButton = ({
  size = "medium",
  label,
  borderRadius,
  icon,
  ...rest
}: GenericButtonProps) => {
  let buttonSize = "md";

  if (size === "small") {
    buttonSize = "sm";
  } else if (size === "large") {
    buttonSize = "lg";
  }

  const buttonStyles = {
    backgroundColor: "rgba(217, 217, 217, 0.15)",
    color: "#64ffda",
    borderRadius: "40px",
  };
  return (
    <Button
      size={buttonSize}
      borderRadius={borderRadius}
      style={buttonStyles}
      {...rest}
    >
      {label}
      {size === "large" && icon && (
        <Image src={icon} w="30px" h="30px" ml="15px" />
      )}
    </Button>
  );
};

export default GenericButton;

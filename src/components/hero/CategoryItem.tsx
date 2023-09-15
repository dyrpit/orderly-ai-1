import { Flex, Text, Center} from '@chakra-ui/react';
import { type TCategories } from '../../types/categories';
import {Link} from 'react-router-dom';

export const CategoryItem = ({ category }: { category: TCategories }) => {
  return (
		<Flex
			as={Link}
			to={category.href}
			maxW={{ base: "100%", md: "385px" }}
			minW='100%'
			h='203px'
			rounded='xl'
			align='center'
			justify='center'
			bgColor={`${category.backgroundColor}`}
			_hover={{ textDecoration: "none" }}>
			<Center p={6}>
				<Text
					fontSize={{ base: 28, md: 34 }}
					color='text.dark'
					fontWeight='bold'
					textAlign='center'>
					{category.categoryName.toUpperCase()}
				</Text>
			</Center>
		</Flex>
	);
};

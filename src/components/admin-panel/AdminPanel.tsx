import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  VStack,
} from '@chakra-ui/react';
import { adminPanelStyles } from './AdminPanelStyles';

const AdminPanel = () => {
  const data = useSelector((state: RootState) => ({
    categories: state.categories,
    products: state.products,
  }));

  return (
    <div>
      <Box color='white'>
        <Link to={''}>Create New Category</Link>
      </Box>

      <Box color='white'>
        <Link to={''}>Edit categories</Link>
      </Box>

      <ul>
        {data.categories.map((category) => (
          <Accordion defaultIndex={[0]} allowMultiple key={category.id}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    style={adminPanelStyles}
                    as='span'
                    flex='1'
                    textAlign='left'
                  >
                    {category.categoryName}
                  </Box>
                  <AccordionIcon style={adminPanelStyles} />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack color='white' align='stretch'>
                  {data.products
                    .filter(
                      (product) => product.category === category.categoryName,
                    )
                    .map((product) => (
                      <Box key={product.id}>
                        <Link to={`${product.category}/${product.name}`}>
                          {product.name}
                        </Link>
                      </Box>
                    ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;

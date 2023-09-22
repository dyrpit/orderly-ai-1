import { useAppSelector } from '@/redux/hooks';
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
  const isAdminPanelOpen = useAppSelector(
    (state) => state.adminPanel.isAdminPanelOpen,
  );

  const data = useSelector((state: RootState) => ({
    categories: state.categories,
    products: state.products,
  }));

  if (!isAdminPanelOpen) return null;

  return (
    <div>
      <Box color='white'>
        <Link to={'/addCategory'}>Create New Category</Link>
      </Box>

      <Box color='white'>
        <Link to={'/addProduct'}>Add product</Link>
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

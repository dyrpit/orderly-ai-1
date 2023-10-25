import React, { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { fetchCategories } from '@/redux/features/categories/categoriesSlice';
import { fetchProducts } from '@/redux/features/products/productsSlice';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { colors } from '@/theme.ts';
import './FileImportModal.css';
import { TCategory } from '@/types/category';
import { TProduct } from '@/types/product';
import toast from 'react-hot-toast';

type TData = {
  categories: TCategory[];
  products: TProduct[];
};

interface InputFileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FileImportModal = ({ isOpen, onClose }: InputFileModalProps) => {
  const [fileValue, setFileValue] = useState<File>();
  const dispatch = useAppDispatch();

  const handleFileBtn = () => {
    onClose();
    const reader = new FileReader();

    if (fileValue) {
      reader.readAsText(fileValue);
      reader.onload = function() {

        if (typeof reader.result === 'string') {
          const data: TData = JSON.parse(reader.result);
          dispatch(fetchCategories(data.categories));
          dispatch(fetchProducts(data.products));
        }
      };

      reader.onerror = function() {
        console.log(reader.onerror);
      };
    } else {
      toast.error('Please select file!');
    }

    setFileValue(undefined);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => {
        onClose();
        setFileValue(undefined);
      }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={colors.white}>Data import</ModalHeader>
          <ModalCloseButton color={colors.white} />
          <ModalBody>
            <input
              type='file'
              id='file'
              name='file'
              accept='.json'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.files) return;
                setFileValue(e.target.files[0]);
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor={colors.bg.secondary}
              onClick={() => {
                onClose();
                setFileValue(undefined);
              }}>
              Close
            </Button>
            {fileValue != undefined ? (<Button ml={3} onClick={handleFileBtn}>Load data</Button>) : null}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

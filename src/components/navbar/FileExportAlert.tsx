import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';
import { colors } from '@/theme.ts';

interface FileExportProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FileExportAlert = ({ isOpen, onClose }: FileExportProps) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const categories = useAppSelector((state) => state.categories);
  const products = useAppSelector((state) => state.products);

  const categoriesWithProducts = {
    categories,
    products
  };

  const exportData = () => {
    onClose();

    const currDate = new Date();
    const dataToExport: string = JSON.stringify(categoriesWithProducts);
    const blob = new Blob([dataToExport], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `orderdly-ai-${currDate.toISOString()}.json`;
    link.href = url;
    link.click();
  };

  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader color={colors.white}>
            Export data?
          </AlertDialogHeader>
          <AlertDialogCloseButton color={colors.white} />
          <AlertDialogBody color={colors.white}>
            Are you sure you want to export data from store?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='green' ml={3} onClick={exportData}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

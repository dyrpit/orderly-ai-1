import React from 'react';
import {
  AlertDialog, AlertDialogBody, AlertDialogCloseButton,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay, Button,
} from '@chakra-ui/react';

interface FileExportProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FileExport = ({  isOpen, onClose  }: FileExportProps) => {
  const cancelRef = React.useRef()

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
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to discard all of your notes? 44 words will be
            deleted.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

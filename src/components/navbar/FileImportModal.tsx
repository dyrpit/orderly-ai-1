import React, { useState } from 'react';
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

interface InputFileModalProps {
  isOpen: boolean,
  onClose: () => void,
}

export const FileImportModal = ({ isOpen, onClose }: InputFileModalProps) => {
  const [fileValue, setFileValue] = useState<File>();

  const handleFileBtn = () => {
    onClose();
    const reader = new FileReader();

    if (fileValue) {
      reader.readAsText(fileValue);
      reader.onload = function() {
        //load to store
        console.log(reader.result);
      };

      reader.onerror = function() {
        console.log(reader.onerror);
      };
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={colors.white}>Data import</ModalHeader>
          <ModalCloseButton color={colors.white}/>
          <ModalBody>
            <input type='file' id='file' name='file' accept='.json'
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                     if (!e.target.files)
                       return;
                     setFileValue(e.target.files[0]);
                   }} />
          </ModalBody>

          <ModalFooter>
            <Button backgroundColor={colors.bg.secondary} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleFileBtn}>Load data</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
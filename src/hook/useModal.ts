import { useModal as useRNModal, modalfy } from 'react-native-modalfy';
import { type ModalList } from "component";

export const useModal = () => useRNModal<ModalList>();

export const {
  currentModal,
  openModal,
  closeModal,
  closeModals,
  closeAllModals,
} = modalfy<ModalList>();

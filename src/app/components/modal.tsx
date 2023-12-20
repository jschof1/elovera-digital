import React, {Memo} from 'react';
import { FaRegHeart } from "react-icons/fa";

// eslint-disable-next-line react/display-name
const Modal = React.memo(({ isOpen, onClose, content }) => {
    if (!isOpen) return null;
    // This function will be called when the backdrop is clicked
    const handleBackdropClick = (event) => {
        // Prevent clicks from the modal content from closing the modal
        if (event.target === event.currentTarget) {
            onClose();
        }
    }
});

export default Modal; 
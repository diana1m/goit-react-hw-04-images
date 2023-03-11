import { Overlay, Modal } from "./Modal.styled";
import { useEffect, useCallback } from 'react';
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector("#modal-root")

export const ImageModal = ({url, onCloseModal}) => {

    const handleKeyDown = useCallback((e) => {
        if (e.code === "Escape") {
            onCloseModal()
        }
    },[onCloseModal]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    const handleBackdropClick = (evn) => {
        if(evn.target === evn.currentTarget){
           onCloseModal() 
        }
    }

    return(
        createPortal(
            <Overlay onClick={handleBackdropClick}>
                <Modal> 
                    <img src={url} alt="large img in modal window"/>
                </Modal>
            </Overlay>
        , modalRoot)  
    )
}

ImageModal.propTypes ={
    url: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
}


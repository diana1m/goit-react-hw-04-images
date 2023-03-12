import { Overlay, Modal } from "./Modal.styled";
import { useEffect } from 'react';
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector("#modal-root")

export const ImageModal = ({url, onCloseModal}) => {

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "Escape") {
                onCloseModal()
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onCloseModal]);

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


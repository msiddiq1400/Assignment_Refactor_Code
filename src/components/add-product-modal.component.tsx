import * as React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import styles from "../shopApp.module.css";
import { Form } from "./form";

export const AddProductModalComponent: React.FC<{
    isOpen: boolean;
    setModalClose: () => void;
    onSubmit: any;
}> = ({isOpen, setModalClose, onSubmit}) => {    
    return (
        <>
            <Modal
              data-testid="add-product-modal"
              ariaHideApp={false}
              isOpen={isOpen}
              className={styles.reactModalContent}
              overlayClassName={styles.reactModalOverlay}
            >
              <div className={styles.modalContentHelper}>
                 <div
                    className={styles.modalClose}
                    onClick={setModalClose}
                 ><FaTimes data-testid="modal-close-button" /></div>

                 <Form
                    on-submit={onSubmit}
                 />
              </div>
           </Modal>
        </>
    );
}
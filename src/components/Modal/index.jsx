import { motion } from "framer-motion";
import Backdrop from "../Backdrop";
import { useState, useRef, useMemo, Suspense } from 'react'


const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };


const Modal = ({ handleClose, text }) => {

    return (
      <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="modal orange-gradient w-[300px] h-[300px]"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p>{text}</p>
            <button onClick={handleClose}>Close</button>
          </motion.div>
      </Backdrop>
    );
  };


  export default Modal;

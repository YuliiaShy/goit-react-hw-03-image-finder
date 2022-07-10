import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends PureComponent {
    componentDidMount() {
        window.addEventListener('keydown', this.handleEsc);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleEsc);
    }

    handleEsc = event => {
        if (event.code === 'Escape') this.props.onClose();
    };

    handleOverlayClick = event => {
        if (event.currentTarget === event.target) this.props.onClose();
    };

    render() {
        const { children } = this.props;
        const { handleOverlayClick } = this;

      return createPortal(
         
         <Overlay onClick={handleOverlayClick}>
           <ModalWindow>
            {children}
           </ModalWindow>
         </Overlay>,
          modalRoot
       );
    }
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
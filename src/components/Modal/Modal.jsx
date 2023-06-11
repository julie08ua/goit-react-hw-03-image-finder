import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay } from './Modal.styled';
import { Modal } from './Modal.styled';

const modalRoot = document.querySelector('#modal');

export class ModalImg extends Component {
  handleBackDrop = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };
  
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackDrop}>
        <Modal>{this.props.children}</Modal>
      </Overlay>,
      modalRoot
    );
  }
}

ModalImg.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
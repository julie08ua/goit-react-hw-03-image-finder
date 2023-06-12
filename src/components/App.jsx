import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getImages } from 'services/getImages';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ModalImg } from './Modal/Modal';
import { AppWrap } from './App.styled';

export class App extends Component {
  state = {
    searchValue: '',
    images: [],
    error: null,
    status: 'idle',
    showModal: false,
    page: 1,
    per_page: 12,
    urlBig: '',
    alt: '',
  };

  async componentDidUpdate(_, prevState) {
    const { searchValue,page } = this.state;

    if (
      prevState.searchValue !== searchValue ||
      prevState.page !== page
    ) {
      this.setState({ status: 'pending' });

      try {
        const images = await getImages(searchValue, page);

        if (!images.hits.length) {
          this.setState({
            error: "No images found for your request(:",
            status: 'rejected',
          });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            status: 'resolved',
      }));
        }
      } catch (error) {
        this.setState({ error: error.message, status: 'rejected' });
      }
    }
  }

    receiveTextForSearch = text => {
    this.setState({ searchValue: text, images: [], page: 1});
  };

  onClickLoadMore = () => {
    this.setState(
      prevState => ({
      page: prevState.page + 1,
      })
    );
  };

  openModal = e => {
    this.setState({ urlBig: e.target.dataset.url });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { status, images, error, showModal, urlBig, alt, per_page} =
      this.state;
    const isBtnVisible = status === 'resolved' && images.length >= per_page;

    return (
      <AppWrap>
        <Searchbar onSubmit={this.receiveTextForSearch} />

        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <ImageGallery images={images} onOpenModal={this.openModal} />
        )}
        {status === 'rejected' && <p>{error}</p>}
        {isBtnVisible && <Button onClick={this.onClickLoadMore} />}

        {showModal && (
          createPortal(
            <ModalImg closeModal={this.toggleModal}>
            <img src={urlBig} alt={alt} />
            </ModalImg>, document.body)
          
        )}

        <ToastContainer autoClose={2500} />
      </AppWrap>
    );
  }
}
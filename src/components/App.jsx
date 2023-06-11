import { Component } from 'react';
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
    totalHits: null,
    error: null,
    status: 'idle',
    showModal: false,
    urlBig: '',
    alt: '',
  };

  receiveTextForSearch = text => {
    this.setState({ searchValue: text });
  };

  async componentDidUpdate(_, prevState) {
    const { searchValue } = this.state;

    if (prevState.searchValue !== searchValue) {
      this.setState({ status: 'pending' });

      try {
        const data = await getImages(searchValue);
        const images = data.hits;
        const totalHits = data.totalHits;

        if (!images.length) {
          this.setState({
            error: `Зображення ${searchValue} відсутні`,
            status: 'rejected',
          });
        } else {
          this.setState({ images, status: 'resolved', totalHits });
        }
      } catch (error) {
        this.setState({ error: error.message, status: 'rejected' });
      }
    }
  }

  addPictures = async page => {
    const { searchValue } = this.state;

    try {
      const data = await getImages(searchValue, page);
      const images = data.hits;

      if (!images.length) {
        this.setState({
          error: `No images found for your request(:`,
          status: 'rejected',
        });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolved',
        }));
      }
    } catch (error) {
      this.setState({ error: error.message, status: 'rejected' });
    }
  };

  openModal = e => {
    this.setState({ urlBig: e.target.dataset.url });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { status, images, error, totalHits, showModal, urlBig, alt} =
      this.state;
    const appearBtnOrNot = status === 'resolved' && totalHits > images.length;

    return (
      <AppWrap>
        <Searchbar onSubmit={this.receiveTextForSearch} />

        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <ImageGallery images={images} onOpenModal={this.openModal} />
        )}
        {status === 'rejected' && <p>{error}</p>}
        {appearBtnOrNot && <Button morePictures={this.addPictures} />}

        {showModal && (
          <ModalImg closeModal={this.toggleModal}>
            <img src={urlBig} alt={alt} />
          </ModalImg>
        )}

        <ToastContainer autoClose={2500} />
      </AppWrap>
    );
  }
}
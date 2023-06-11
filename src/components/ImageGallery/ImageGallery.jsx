import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images, error, onOpenModal }) => {
  return (
    <GalleryList>
      <ImageGalleryItem images={images} error={error} onOpenModal={onOpenModal}/>
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

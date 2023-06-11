import { GalleryItem, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, onOpenModal }) => {
  return (
    <>
      {images &&
        images.map(image => (
          <GalleryItem key={image.id}>
            <Img
              src={image.webformatURL}
              alt={image.tags}
              data-url={image.largeImageURL}
              onClick={onOpenModal}
            />
          </GalleryItem>
        ))}
    </>
  );
};
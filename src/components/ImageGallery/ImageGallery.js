import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ images, onClick }) => {
  return (
    <Gallery>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          cardUrl={webformatURL}
          alt={tags}
          onClick={() => onClick(largeImageURL)}
        />
      ))}
    </Gallery>
  );
  }


ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired),
  onClick: PropTypes.func,
};

export default ImageGallery;

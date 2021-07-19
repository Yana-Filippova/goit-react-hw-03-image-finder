import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images }) => (
  <ul className={styles.ImageGallery}>
    {images &&
      images.map(({ webformatURL, tags, largeImageURL, id }) => (
        <ImageGalleryItem
          src={webformatURL}
          alt={tags}
          largeImageURL={largeImageURL}
          key={id}
        />
      ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;

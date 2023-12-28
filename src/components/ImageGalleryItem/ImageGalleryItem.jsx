import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  return (
    <li className="gallery-item">
      <img src={webformatURL} alt={tags} width={300} />
    </li>
  );
};

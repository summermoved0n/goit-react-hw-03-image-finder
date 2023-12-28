import css from './Button.module.css';

export const Button = ({ onLoad }) => {
  return (
    <button type="button" onClick={onLoad}>
      Load more
    </button>
  );
};

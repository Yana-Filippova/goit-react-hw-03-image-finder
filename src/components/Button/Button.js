import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClickLoadMore }) => (
  <>
    <button type="button" className={styles.Button} onClick={onClickLoadMore}>
      Load more
    </button>
  </>
);

Button.propTypes = {
  onClickLoadMore: PropTypes.func.isRequired,
};

export default Button;

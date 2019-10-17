import PropTypes from 'prop-types';

export const LetterAvatar = ({ text }) => {
  const firstLetter = text.length > 0 ? text[0] : '';
  return firstLetter;
};

LetterAvatar.propTypes = {
  /**
   * Title of the avatar
   */
  text: PropTypes.string.isRequired,
};

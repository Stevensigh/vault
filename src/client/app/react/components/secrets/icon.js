import React from 'react';
import PropTypes from 'prop-types';
import { colors, Text } from 'react-elemental';
import withToggleState from 'client/app/react/hoc/with-toggle-state';

/**
 * Image icon for each secret with graceful placeholder text fallback.
 */
const SecretIcon = ({ name, image, isLoaded, handleImageLoad }) => (
  <div
    style={{
      alignItems: 'center',
      backgroundColor: colors.gray80,
      borderRadius: '50%',
      boxShadow: '0px 0px 3px 3px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      height: '30px',
      justifyContent: 'center',
      width: '30px',
    }}
  >
    {image && (
      <img
        src={image}
        style={{ borderRadius: '50%', width: '100%' }}
        onLoad={handleImageLoad}
      />
    )}

    {!isLoaded && (
      <Text color="gray25" size="20px" style={{ position: 'absolute' }} uppercase>
        {name[0]}
      </Text>
    )}
  </div>
);

SecretIcon.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  isLoaded: PropTypes.bool.isRequired,
  handleImageLoad: PropTypes.func.isRequired,
};

SecretIcon.defaultProps = {
  image: null,
};

export default withToggleState({
  key: 'isLoaded',
  enable: 'handleImageLoad',
  initial: false,
})(SecretIcon);

import styled from 'styled-components';
import { Button as Base } from '@buffetjs/core';

const Button = styled(Base)`
  width: 100%;
  text-transform: ${({ textTransform }) => textTransform};
  padding: 2px 15px 0px;
`;

Button.defaultProps = {
  color: 'primary',
  type: 'button',
  textTransform: 'none',
};

export default Button;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Colors from './colors';

export const StyledButton = styled.button`
  text-align: center;
  align-items: center;
  justify-content: center;
  color: white;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  padding-right: 10px;
  padding-left: 10px;
  text-transform: uppercase;
  font-family: FuturaBTW01-ExtraBlack;
  font-size: 0.75em;
  background-color: ${Colors.PURPLE};
  border-width: 0;
  cursor: pointer;
  width: 100%;
  margin-top: 3.5rem;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:hover {
    background-color: ${Colors.PURPLE_LIGHT};
  }
`;

export const StyledButtonSecondary = styled(StyledButton)`
  background-color: ${Colors.RED};

  &:hover {
    background-color: ${Colors.GRAY_LIGHT};
  }
`;
export const StyledLink = React.memo(({ to, children, containerStyle }) => (
  <StyledLinkComponent to={to}>
    <LinkContainer style={containerStyle}>{children}</LinkContainer>
  </StyledLinkComponent>
));

const LinkContainer = styled.div`
  background-color: ${Colors.PURPLE};
  text-align: center;
  align-items: center;
  justify-content: center;
  display: inline-flex;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  padding-right: 10px;
  padding-left: 10px;
  margin-top: 3.5rem;
  width: 100%;
  font-size: 0.75em;
  max-width: 28.5em;
  &:hover {
    background-color: ${Colors.PURPLE_LIGHT};
  }
`;
const StyledLinkComponent = styled(Link)`
  text-align: center;
  align-items: center;
  justify-content: center;
  color: white;
  text-transform: uppercase;
  font-family: FuturaBTW01-ExtraBlack;
  width: 100%;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const NoStyleLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const ButtonGroup = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
`;
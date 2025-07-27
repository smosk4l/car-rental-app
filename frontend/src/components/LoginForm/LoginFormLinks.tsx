import React from 'react';
import { LinksSection, LinkText, StyledLink, BackLink } from './styles';
import { UI_TEXT } from '@/constants/ui';

export const LoginFormLinks: React.FC = () => {
  return (
    <LinksSection>
      <LinkText>
        {UI_TEXT.LINKS.NO_ACCOUNT}{' '}
        <StyledLink href="/auth/register">{UI_TEXT.LINKS.SIGN_UP}</StyledLink>
      </LinkText>
      <BackLink href="/">{UI_TEXT.LINKS.BACK_HOME}</BackLink>
    </LinksSection>
  );
};

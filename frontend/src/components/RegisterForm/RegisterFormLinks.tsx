'use client';

import React from 'react';
import { LinksSection, LinkText, StyledLink, BackLink } from './styles';
import { REGISTER_UI_TEXT } from '@/constants/ui';

export const RegisterFormLinks: React.FC = () => {
  return (
    <LinksSection>
      <LinkText>
        {REGISTER_UI_TEXT.LINKS.HAVE_ACCOUNT}{' '}
        <StyledLink href="/auth/login">
          {REGISTER_UI_TEXT.LINKS.SIGN_IN}
        </StyledLink>
      </LinkText>
      <BackLink href="/">{REGISTER_UI_TEXT.LINKS.BACK_HOME}</BackLink>
    </LinksSection>
  );
};

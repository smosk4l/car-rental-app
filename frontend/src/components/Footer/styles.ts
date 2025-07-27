import styled from 'styled-components';
import Link from 'next/link';

export const Footer = styled.footer`
  background-color: #021c3b;
  color: ${({ theme }) => theme.colors.white};
  padding: 3rem;
`;

export const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem; /* px-4 */
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem; /* gap-8 */

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const FooterSection = styled.div``;

export const FooterSubtitle = styled.h4`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: 1rem; /* mb-4 */
  color: #fafafa;
`;

export const FooterDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem; /* mb-4 */
  line-height: ${({ theme }) => theme.lineHeights.normal};
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* space-y-2 */
`;

export const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.8);
`;

export const FooterDivider = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 2rem; /* mt-8 */
  padding-top: 2rem; /* pt-8 */
  text-align: center;
`;

export const CopyrightText = styled.p`
  color: rgba(255, 255, 255, 0.6);
`;

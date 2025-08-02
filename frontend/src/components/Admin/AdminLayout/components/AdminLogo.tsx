import { Car } from 'lucide-react';
import { ADMIN_CONFIG, ICON_SIZES } from '@/constants/admin';
import {
  LogoSection,
  LogoIcon,
  LogoText,
  LogoTitle,
  LogoSubtitle,
} from '../styles';

export const AdminLogo = () => (
  <LogoSection>
    <LogoIcon>
      <Car style={{ width: ICON_SIZES.large, height: ICON_SIZES.large }} />
    </LogoIcon>
    <LogoText>
      <LogoTitle>{ADMIN_CONFIG.APP_NAME}</LogoTitle>
      <LogoSubtitle>{ADMIN_CONFIG.APP_SUBTITLE}</LogoSubtitle>
    </LogoText>
  </LogoSection>
);

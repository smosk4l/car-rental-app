import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/UI/Avatar';
import { ADMIN_CONFIG, ICON_SIZES } from '@/constants/admin';
import {
  BottomSection,
  UserInfo,
  UserDetails,
  UserName,
  UserEmail,
  SignOutButton,
} from '../styles';

interface SessionUser {
  name?: string;
  email?: string;
  image?: string;
}

export const AdminUserSection = () => {
  const { data: session } = useSession();
  const user = session?.user as SessionUser;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const getUserInitials = (name?: string): string => {
    if (!name) return ADMIN_CONFIG.DEFAULT_USER_INITIALS;

    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = user?.name || ADMIN_CONFIG.DEFAULT_USER_NAME;
  const displayEmail = user?.email || ADMIN_CONFIG.DEFAULT_USER_EMAIL;
  const userInitials = getUserInitials(user?.name);

  return (
    <BottomSection>
      <UserInfo>
        <Avatar style={{ width: ICON_SIZES.xlarge, height: ICON_SIZES.xlarge }}>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback
            style={{
              background: '#007bff',
              color: 'white',
              fontSize: '0.875rem',
            }}
          >
            {userInitials}
          </AvatarFallback>
        </Avatar>
        <UserDetails>
          <UserName>{displayName}</UserName>
          <UserEmail>{displayEmail}</UserEmail>
        </UserDetails>
      </UserInfo>
      <SignOutButton onClick={handleSignOut}>
        <LogOut
          style={{
            marginRight: '0.75rem',
            width: ICON_SIZES.small,
            height: ICON_SIZES.small,
          }}
        />
        Sign out
      </SignOutButton>
    </BottomSection>
  );
};

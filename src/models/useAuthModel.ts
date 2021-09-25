import { User } from '@/models';
import { getUser } from '@/services/user';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';

export default () => {
  const [user, setUser] = useState<User | null>(null);

  const getProfile = useCallback(() => {
    getUser().then((profile) => {
      const account = Cookies.get('account');
      profile.account = account;
      setUser(profile);
    });
  }, []);

  const logout = useCallback(() => {
    window.location.href = '/oauth/logout/';
  }, []);

  const toAdmin = useCallback(() => {
    window.location.href = '/admin/';
  }, []);

  return {
    user,
    getProfile,
    logout,
    toAdmin,
  };
};

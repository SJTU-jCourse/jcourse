import config from '@/config';
import { User } from '@/models';
import { getUser, logOut } from '@/services/user';
import { useCallback, useState } from 'react';

export default () => {
  const [user, setUser] = useState<User | null>(null);

  const getProfile = useCallback(() => {
    getUser().then((profile) => {
      profile.account = localStorage.getItem('account');
      setUser(profile);
    });
  }, []);

  const logout = useCallback(() => {
    logOut().then(() => {
      window.location.href = `https://jaccount.sjtu.edu.cn/oauth2/logout?client_id=${config.JACCOUNT_CLIENT_ID}&post_logout_redirect_uri=${config.JACCOUNT_LOGIN_RETURI}`;
    });
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

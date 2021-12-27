import { VALID_AUTH_TOKEN } from '../lib/constants';

export const useCurrentUser = () => {
  const [_, user] = getCurrentUserSession();
  return user;
};

export const useCurrentSession = () => {
  const [session] = getCurrentUserSession();
  return session;
};

enum Role {
  SUPERADMIN,
  USER,
}

type User = {
  id: number | null;
  email: string;
  role: Role | null;
  name?: string;
  avatar?: string;
};

type Session = {
  isLoggedIn: boolean;
};

const getCurrentUserSession = (): [Session, User] => {
  const sessionData: Session = { isLoggedIn: false };
  const userData: User = { id: null, email: '', role: null };

  if (typeof window === 'undefined') {
    return [sessionData, userData];
  }

  const name = 'authToken=';
  let decodedCookie = decodeURIComponent(window.document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      const token = c.substring(name.length, c.length);
      if (token === VALID_AUTH_TOKEN) {
        sessionData.isLoggedIn = true;
        userData.id = 0;
        userData.name = 'Zhanibek';
        userData.email = 'hiPolar@FEtask.com';
        userData.avatar = '';
        userData.role = Role.USER;

        return [sessionData, userData];
      }
    }
  }

  return [sessionData, userData];
};

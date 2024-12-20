import { router } from './utils/router';
import { login } from './pages/login';
import { register } from './pages/register';
import { guestCheck } from './utils/guest-check';
import { getCookieMap } from './utils/cookie';
import { home } from './pages/home';
import { bootstrap } from './core/bootstrap';
import { mypage } from './pages/mypage';

bootstrap(
  router(
    [
      { path: '/', fn: home },
      { path: '/mypage', fn: mypage },
      { path: '/articles/:id', fn: ({ id }) => { /* 未実装 */ } },
      { path: '/register', fn: guestCheck(register) },
      { path: '/login', fn: guestCheck(login) },
    ],
    {
      onNotFound: () => console.log('NOT FOUND'),
      onAfter: () => {
        const bodyClassList = document.body.classList;
        const isLoggedin = Boolean(getCookieMap().get('user.id'));
        bodyClassList.add(isLoggedin ? 'is-loggedin' : 'is-guest');
        bodyClassList.remove(isLoggedin ? 'is-guest' : 'is-loggedin');
      }
    }
  )
);

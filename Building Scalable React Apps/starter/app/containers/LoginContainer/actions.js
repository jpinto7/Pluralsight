/*
 *
 * LoginContainer actions
 *
 */

import {
  LOGIN,
  CANCEL_LOGIN
} from './constants';

export const login = email => ({
  type: LOGIN,
  email
});

export const cancelLogin = () => ({
  type: CANCEL_LOGIN
});

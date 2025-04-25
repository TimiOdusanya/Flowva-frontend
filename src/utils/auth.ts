import Cookies from "js-cookie";
import { addDays, addHours, differenceInSeconds } from "date-fns";

// export const ACCESS_TOKEN = "Authorization";
export const ACCESS_TOKEN = "jwt"
export const ACCESS_TOKEN_EXPIRY = differenceInSeconds(
  addHours(new Date(), 3),
  new Date()
);
export const REFRESH_TOKEN_EXPIRY = differenceInSeconds(
  addDays(new Date(), 30),
  new Date()
);

export function saveToken(token: string) {
  Cookies.set(ACCESS_TOKEN, token, { expires: 10 / 24 });
  return true;
}

export function removeToken() {
  Cookies.remove(ACCESS_TOKEN);
  return true;
}

export function getToken() {
  const token = Cookies.get(ACCESS_TOKEN);
  return token || false;
}

export function hasToken() {
  return !!Cookies.get(ACCESS_TOKEN);
}
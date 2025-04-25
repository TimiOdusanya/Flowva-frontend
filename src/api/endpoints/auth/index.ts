/* eslint-disable @typescript-eslint/no-explicit-any */
import $ from "../../index";

type ResponsTypes = Promise<{
  status?: boolean;
  success?: boolean;
  message?: string;
  error?: {
    data: {
      message?: string;
    };
    [key: string]: any;
  };
  data: {
    [key: string]: any;
  };
}>;


export type ResponseData = {
  success?: boolean;
  message?: string;
  accessToken?: string;
  error?: {
    data: {
      message?: string;
    };
    [key: string]: any;
  };
  data: {
    [key: string]: any;
  };
};

export type APIError = {
  data?: {
    message?: string;
  };
};

export type ResponseTypes = Promise<ResponseData>;




export function loginAPI(data: {
  email: string;
  password: string;
}): ResponseTypes {
  return $({
    url: "/auth/login",
    method: "post",
    data: data,
  });
}

export function signUp(data: {
    email: string;
    password: string;
  }): ResponseTypes {
    return $({
      url: "/auth/signup",
      method: "post",
      data: data,
    });
  }


  export function forgotPassword(data: {
    email: string;
  }): ResponseTypes {
    return $({
      url: "/auth/forgot-password",
      method: "post",
      data: data,
    });
  }


export function verifyEmailAPI(data: {
  email: string;
  otp: string;
}): ResponsTypes {
  return $({
    url: "/auth/verify-forgot-password",
    method: "post",
    data: data,
  });
}


export function resetPasswordAPI(data: {
    email: string;
    newPassword: string;
  }): ResponsTypes {
    return $({
      url: "/auth/reset-password",
      method: "put",
      data: data,
    });
  }


export function resendCodeAPI(data: { email: string }): ResponsTypes {
  return $({
    url: "/auth/resend-otp",
    method: "post",
    data: data,
  });
}

export function logoutAPI(): ResponsTypes {
  return $({
    url: "/auth/logout",
    method: "post",
  });
}

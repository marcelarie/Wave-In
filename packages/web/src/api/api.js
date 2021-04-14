import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {
  function signUp(headers, body) {
    return request({
      url: "/sign-up",
      requestMethod: "POST",
      headers: headers,
      body,
    });
  }

  function signOut(headers) {
    return request({
      url: "/sign-out",
      requestMethod: "POST",
      headers: headers,
    });
  }

  return {
    signUp: signUp,
    signOut: signOut,
  };
}

export default makeApi();

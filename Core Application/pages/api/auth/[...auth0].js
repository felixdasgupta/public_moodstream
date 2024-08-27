import {
  handleAuth,
  handleLogin,
  handleCallback,
  handleLogout
} from "@auth0/nextjs-auth0";

// Use this later to create Admin Level Access
// const getLoginState = (req, loginOptions) => {
//   return { basket_id: getBasketId(req) };
// };

const afterCallback = (req, res, session, state) => {
  console.log("STATE", session, state);
  return session;
};

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        baseURL: process.env.HOST,
        returnTo: "/clients/room"
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async logout(req, res) {
    try {
      // Pass custom parameters to login
      await handleLogout(req, res, {
        returnTo: "/"
      });
    } catch (error) {
      console.error(error);
      res.status(error.status || 400).end(error.message);
    }
  }
});

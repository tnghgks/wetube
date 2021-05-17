import express from "express";
import passport from "passport";
import routes from "../routes";
import { home,search } from "../controllers/videoController";
import {onlyPublic, onlyPrivate} from "../middlewares";
import { getJoin, postJoin, getLogin, postLogin, logout ,githubLogin,postGithubLogin,facebookLogin,postFacebookLogin, getMe } from "../controllers/userController";

const globalRouter = express.Router();


globalRouter.get(routes.join,onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login,onlyPublic, getLogin);
globalRouter.post(routes.login,onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
	routes.githubCallback,
	passport.authenticate("github", {
		failureRedirect: routes.login
	}),
	postGithubLogin
);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
	routes.facebookCallback,
	passport.authenticate("facebook", {
		failureRedirect: routes.login
	}),
	postFacebookLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
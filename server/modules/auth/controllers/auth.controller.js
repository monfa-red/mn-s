'use strict';

/**
 * Module dependencies
 */
import passport from 'passport';
import jwt from 'jsonwebtoken';

/**
 * Authentication failure redirect route
 */
const FAILURE_REDIRECT = '/auth/signup';


/**
 * Export authentication handleres
 */
export default  {

  signToken,

  setToken,

  local,

  facebook: {
    oAuth: facebookOAuth,
    oAuthCallback: facebookCallback
  },

  google: {
    oAuth: googleOAuth,
    oAuthCallback: googleCallback
  }

};


/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, role) {
  return jwt.sign({ _id: id, role: role }, config.secret, {
    expiresInMinutes: 60 * 5
  });
};

/**
 * Set token cookie directly for oAuth strategies
 */
function setToken(req, res) {
  if (!req.user) return res.status(404).json({
    message: 'Something went wrong, please try again.'
  })
  let token = signToken(req.user._id, req.user.role);
  // res.cookie('token', JSON.stringify(token));
  res.json({ token: token });
};



/**
 * Facebook passport authentication and callback
 */
function facebookOAuth(req, res, next) {
  passport.authenticate('facebook', (err, user, info) => {
    scope: ['email', 'user_about_me'],
    failureRedirect: FAILURE_REDIRECT,
    session: false
  })(req, res, next);
};

function facebookCallback(req, res, next) {
  passport.authenticate('facebook', (err, user, info) => {
    failureRedirect: FAILURE_REDIRECT,
    session: false
  })(req, res, next);
};


/**
 * Google passport authentication and callback
 */
function googleOAuth(req, res, next) {
  passport.authenticate('google', (err, user, info) => {
    scope: ['profile', 'email'],
    failureRedirect: FAILURE_REDIRECT,
    session: false
  })(req, res, next);
};

function googleCallback(req, res, next) {
  passport.authenticate('google', (err, user, info) => {
    failureRedirect: FAILURE_REDIRECT,
    session: false
  })(req, res, next);
};





function local(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    let error = err || info;
    if (error) return res.status(401).json(error);
    if (!user) return res.status(404).json({
      message: 'Something went wrong, please try again.'
    });
    // res.json({you:'dam exist!'})
  })(req, res, next)
}

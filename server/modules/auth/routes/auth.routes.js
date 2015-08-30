'use strict';

/**
 * Moudle dependencies
 */
import auth from '../controllers/auth.controller';


/**
 * Export authentiocation Routes
 */
export default authRouter;


/**
 *  Assign auth routes to controllers
 */
function authRouter(app) {

  /**
   * Local Authentication
   */
  app
    .route('/api/auth/local')
      .post(auth.local)

  /**
   * Facebook Authentication
   */
  app
    .route('/api/auth/facebook')
      .get(auth.facebook.oAuth);

  app
    .route('/api/auth/facebook/callback')
      .get(auth.facebook.oAuthCallback, auth.signToken);

  /**
   * Google Authentication
   */
  app
    .route('/api/auth/google')
      .get(auth.google.oAuth);

  app
    .route('/api/auth/google/callback')
      .get(auth.google.oAuthCallback, auth.signToken);



};

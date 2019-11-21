import passport from 'passport';
import { Strategy as LocalStrategy} from 'passport-local';

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('aue+++++++++++++++++/n+++++++++')
        return done(null, username);

    }
  ));
  passport.serializeUser(function(user, done) {
    return done(null, user);
  })
  
  passport.deserializeUser(function(user, done) {
    return done(null, user);
  })
export default passport
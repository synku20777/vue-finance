import bcrypt from 'bcryptjs'
import passport from 'passport'
import { GraphQLLocalStrategy } from 'graphql-passport'
import User from '../models/user.model.js'

const passportConfig = async () => {
  passport.serializeUser((user, done) => {
    console.log('serializeUser')
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    console.log('deserializeUser')
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (error) {
      done(error)
    }
  })
}

passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    try {
      const user = await User.findOne({ email })

      if (!user) {
        return done(new Error('User not found'))
      }

      const passwordValid = await bcrypt.compare(password, user.password)

      if (!passwordValid) {
        return done(new Error('Invalid password'))
      }

      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }),
)

export default passportConfig

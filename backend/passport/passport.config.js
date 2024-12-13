import passport from 'passport'
import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { GraphQLLocalStrategy } from 'graphql-passport'

const passportConfig = async () => {
  passport.serializeUser((user, done) => {
    console.log('Serializing user:', user)
    done(null, user._id) // Use _id instead of id
  })

  passport.deserializeUser(async (id, done) => {
    console.log('Deserializing user with id:', id)
    try {
      const user = await User.findById(id).lean() // Use lean() to get a plain object
      console.log('User found:', user)
      done(null, user)
    } catch (err) {
      console.error('Error deserializing user:', err)
      done(err)
    }
  })

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username })
        if (!user) {
          throw new Error('Invalid username or password')
        }
        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
          throw new Error('Invalid username or password')
        }

        return done(null, user)
      } catch (err) {
        console.error('Error in strategy:', err)
        return done(err)
      }
    }),
  )
}

export default passportConfig

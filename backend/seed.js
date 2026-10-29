import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from './models/user.model.js'
import Transaction from './models/transaction.model.js'

dotenv.config()

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

async function seed() {
  const mongoUri = process.env.MONGO_URI
  if (!mongoUri) {
    console.error('Error: MONGO_URI environment variable is not set.')
    process.exit(1)
  }

  console.log(`Connecting to MongoDB at ${mongoUri}...`)
  await mongoose.connect(mongoUri)
  console.log('Connected to MongoDB.')

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash('demo1234', salt)

  let user = await User.findOne({
    $or: [{ username: 'demo' }, { email: 'demo@example.com' }],
  })

  if (!user) {
    user = await User.create({
      username: 'demo',
      name: 'Alex Morgan',
      email: 'demo@example.com',
      password: hashedPassword,
    })
    console.log(`Created demo user: ${user.username} (${user._id})`)
  } else {
    user.username = 'demo'
    user.name = 'Alex Morgan'
    user.email = 'demo@example.com'
    user.password = hashedPassword
    await user.save()
    console.log(`Upserted demo user: ${user.username} (${user._id})`)
  }

  const deleteResult = await Transaction.deleteMany({ userId: user._id })
  console.log(`Deleted ${deleteResult.deletedCount} existing transactions for user ${user.username}.`)

  const rand = mulberry32(42)
  const randBetween = (min, max) => Math.round((min + rand() * (max - min)) * 100) / 100

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0)
  const daysAgo = (d) => new Date(today.getTime() - d * 24 * 60 * 60 * 1000)

  const transactions = [
    // Income / Saving: monthly salary (~3200-3650) + 1 freelance
    { description: 'Monthly salary', amount: 3450, paymentType: 'card', category: 'saving', date: daysAgo(82) },
    { description: 'Monthly salary', amount: 3450, paymentType: 'card', category: 'saving', date: daysAgo(52) },
    { description: 'Monthly salary', amount: 3450, paymentType: 'card', category: 'saving', date: daysAgo(22) },
    { description: 'Freelance web project', amount: 850, paymentType: 'card', category: 'saving', date: daysAgo(37) },

    // Investments: index funds (200-400)
    { description: 'Global index fund ETF', amount: 350, paymentType: 'card', category: 'investment', date: daysAgo(75) },
    { description: 'S&P 500 index fund', amount: 300, paymentType: 'card', category: 'investment', date: daysAgo(46) },
    { description: 'World ESG index ETF', amount: 350, paymentType: 'card', category: 'investment', date: daysAgo(16) },

    // Housing & fixed expenses: Rent (~980)
    { description: 'Apartment rent', amount: 980, paymentType: 'card', category: 'expense', date: daysAgo(88) },
    { description: 'Apartment rent', amount: 980, paymentType: 'card', category: 'expense', date: daysAgo(58) },
    { description: 'Apartment rent', amount: 980, paymentType: 'card', category: 'expense', date: daysAgo(28) },

    // Utilities
    { description: 'Electricity and heating', amount: 86.4, paymentType: 'card', category: 'expense', date: daysAgo(78) },
    { description: 'Electricity and heating', amount: 91.2, paymentType: 'card', category: 'expense', date: daysAgo(48) },
    { description: 'Electricity and heating', amount: 84.1, paymentType: 'card', category: 'expense', date: daysAgo(18) },

    // Subscriptions & telecom
    { description: 'Internet fiber subscription', amount: 49.99, paymentType: 'card', category: 'expense', date: daysAgo(72) },
    { description: 'Internet fiber subscription', amount: 49.99, paymentType: 'card', category: 'expense', date: daysAgo(42) },
    { description: 'Internet fiber subscription', amount: 49.99, paymentType: 'card', category: 'expense', date: daysAgo(12) },
    { description: 'Gym membership', amount: 45, paymentType: 'card', category: 'expense', date: daysAgo(84) },
    { description: 'Gym membership', amount: 45, paymentType: 'card', category: 'expense', date: daysAgo(24) },

    // Transport
    { description: 'Monthly transit pass', amount: 75, paymentType: 'card', category: 'expense', date: daysAgo(85) },
    { description: 'Monthly transit pass', amount: 75, paymentType: 'card', category: 'expense', date: daysAgo(55) },
    { description: 'Monthly transit pass', amount: 75, paymentType: 'card', category: 'expense', date: daysAgo(25) },
    { description: 'Regional train ticket', amount: 42.5, paymentType: 'card', category: 'expense', date: daysAgo(39) },

    // One-offs (including ~600 outlier)
    { description: 'Smartphone replacement', amount: 629, paymentType: 'card', category: 'expense', date: daysAgo(61) },
    { description: 'Dental cleaning and checkup', amount: 110, paymentType: 'card', category: 'expense', date: daysAgo(33) },

    // Restaurants & Coffee
    { description: 'Italian dinner with friends', amount: 58.5, paymentType: 'card', category: 'expense', date: daysAgo(76) },
    { description: 'Team lunch', amount: 24, paymentType: 'card', category: 'expense', date: daysAgo(64) },
    { description: 'Weekend brunch cafe', amount: 31.2, paymentType: 'card', category: 'expense', date: daysAgo(44) },
    { description: 'Sushi takeout dinner', amount: 38.5, paymentType: 'card', category: 'expense', date: daysAgo(21) },
    { description: 'Espresso and pastry', amount: 5.6, paymentType: 'cash', category: 'expense', date: daysAgo(86) },
    { description: 'Artisan bakery coffee', amount: 6.4, paymentType: 'cash', category: 'expense', date: daysAgo(30) },
  ]

  // 15 groceries spread across 3 months (many small, 20-95 EUR)
  const groceryDays = [87, 81, 74, 67, 59, 53, 47, 38, 32, 26, 19, 14, 9, 5, 2]
  const groceryDescriptions = [
    'Supermarket weekly groceries',
    'Fresh fruits and vegetables',
    'Organic food market',
    'Bakery and dairy groceries',
    'Supermarket weekly groceries',
    'Neighborhood grocery run',
    'Supermarket weekly groceries',
    'Local produce market',
    'Supermarket weekly groceries',
    'Fresh food and bakery',
    'Supermarket weekly groceries',
    'Organic market items',
    'Supermarket weekly groceries',
    'Farmers market produce',
    'Local grocery essentials',
  ]

  groceryDays.forEach((day, idx) => {
    transactions.push({
      description: groceryDescriptions[idx],
      amount: randBetween(21, 93),
      paymentType: rand() < 0.2 ? 'cash' : 'card',
      category: 'expense',
      date: daysAgo(day),
    })
  })

  const docs = transactions.map((t) => ({
    ...t,
    userId: user._id,
  }))

  await Transaction.insertMany(docs)

  const summary = {}
  docs.forEach((t) => {
    if (!summary[t.category]) {
      summary[t.category] = { count: 0, total: 0 }
    }
    summary[t.category].count++
    summary[t.category].total += t.amount
  })

  console.log('\n--- Seed Summary ---')
  console.log(`User: ${user.username} (${user.email})`)
  console.log(`Total transactions inserted: ${docs.length}`)
  for (const [category, stats] of Object.entries(summary)) {
    console.log(`  - ${category}: ${stats.count} transactions, total: €${stats.total.toFixed(2)}`)
  }
}

seed()
  .catch((err) => {
    console.error('Seed script failed:', err)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB.')
  })

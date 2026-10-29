const moneyFormatter = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export function formatMoney(amount?: number | null): string {
  if (amount == null) return '€0.00'
  const num = typeof amount === 'number' ? amount : Number(amount)
  if (isNaN(num)) return '€0.00'
  return moneyFormatter.format(num)
}

export function categoryLabel(category?: string | null): string {
  if (!category) return ''
  switch (category) {
    case 'saving':
      return 'Income'
    case 'expense':
      return 'Expense'
    case 'investment':
      return 'Investment'
    default:
      return category
  }
}

export function formatDate(ms?: string | number | null): string {
  if (!ms) return ''
  const timestamp = typeof ms === 'string' && /^\d+$/.test(ms.trim()) ? Number(ms) : ms
  const date = new Date(timestamp)
  if (isNaN(date.getTime())) return String(ms)
  return dateFormatter.format(date)
}

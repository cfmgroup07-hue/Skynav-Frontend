export const formatCurrency = (amount, currency = 'USD', locale = 'en') => {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount || 0)
  } catch {
    return `${currency} ${amount || 0}`
  }
}

export const formatDate = (dateValue, locale = 'en') => {
  try {
    return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(dateValue))
  } catch {
    return new Date(dateValue).toLocaleDateString()
  }
}

const formatCurrency = amount => {
    amount = amount.toString()
    const pos = amount.length-2
    amount = `${amount.slice(0, pos)}.${amount.slice(pos)}`
    amount = new Intl.NumberFormat("en-US").format(parseFloat(amount))
    return amount
  }

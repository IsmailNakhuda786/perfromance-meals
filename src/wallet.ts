export interface WalletBalances {
  funded: number
  giftFunded: number
  bonus: number
}

export const INITIAL_WALLET_BALANCES: WalletBalances = {
  funded: 8,
  giftFunded: 4.5,
  bonus: 5,
}

export function getMonetaryWalletBalance(wallet: WalletBalances) {
  return wallet.funded + wallet.giftFunded
}

export const REWARD_TIERS = [
  {
    name: "Starter",
    minPoints: 0,
    maxPoints: 499,
    pointsPerDollar: 1,
  },
  {
    name: "Gold",
    minPoints: 500,
    maxPoints: 1999,
    pointsPerDollar: 1.5,
  },
  {
    name: "Platinum",
    minPoints: 2000,
    maxPoints: null,
    pointsPerDollar: 2,
  },
] as const

export const REWARD_REDEMPTIONS = [
  { points: 500, credit: 5 },
  { points: 1000, credit: 11 },
  { points: 2000, credit: 25 },
] as const

export const MEAL_PLAN_POINTS_MULTIPLIER = 1.5
export const POINTS_ACTIVITY_WINDOW_DAYS = 90

export function formatRewardTierRange(
  tier: (typeof REWARD_TIERS)[number],
) {
  return tier.maxPoints === null
    ? `${tier.minPoints.toLocaleString()}+ pts`
    : `${tier.minPoints.toLocaleString()}–${tier.maxPoints.toLocaleString()} pts`
}

export function getRewardTier(points: number) {
  return (
    REWARD_TIERS.find(
      (tier) =>
        points >= tier.minPoints &&
        (tier.maxPoints === null || points <= tier.maxPoints),
    ) ?? REWARD_TIERS[0]
  )
}

export function getNextRewardTier(points: number) {
  return REWARD_TIERS.find((tier) => tier.minPoints > points) ?? null
}

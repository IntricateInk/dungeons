module BattleAbility where

import Battle (Battle)
import BattleUnit (BattleUnit)

type BattleAbilityTargets = Array BattleUnit

type BattleAbility = {
    name :: String,
    use :: Battle -> BattleUnit -> BattleAbilityTargets -> Battle
}
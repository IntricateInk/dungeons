module Battle (Battle(Battle2)) where

import Prelude

import BattleUnit (BattleUnit)

data Battle = Battle2
    {
        units :: Array BattleUnit,
        turn :: Int
    }

isBattleEnd :: Battle -> Boolean
isBattleEnd (Battle2 battle) = battle.turn == 5

instance showBattle :: Show Battle where
    show (Battle2 battle) = show battle.units
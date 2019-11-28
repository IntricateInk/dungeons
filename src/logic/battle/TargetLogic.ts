import { BattleCharacter } from "./BattleCharacterState";
import { BattleState } from "./BattleState";

export function TargetRandomSingleOpponent(battle: BattleState, character: BattleCharacter): BattleCharacter[][] {
    return battle.characters.filter(c => c.state.alliance !== character.state.alliance).map(c => [c]);
}

export function TargetSelf(battle: BattleState, character: BattleCharacter): BattleCharacter[][] {
    return [[character]];
}

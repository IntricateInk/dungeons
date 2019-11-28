import { BattleCharacter } from "./BattleCharacterState";
import { BattleState } from "./BattleState";

export type BattleAbility = {
    name: string;

    getTargets(battle: BattleState, character: BattleCharacter): BattleCharacter[][];
    use(battle: BattleState, character: BattleCharacter, targets: BattleCharacter[]): BattleState;
}
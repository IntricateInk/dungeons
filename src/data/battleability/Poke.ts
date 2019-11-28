import { BattleAbility } from "../../logic/battle/BattleAbility";
import { BattleCharacter } from "../../logic/battle/BattleCharacterState";
import { BattleState, BattleTag } from "../../logic/battle/BattleState";
import { TargetRandomSingleOpponent } from "../../logic/battle/TargetLogic";

export const Poke: BattleAbility = {
    
    name: 'Poke',
    getTargets: TargetRandomSingleOpponent,

    use: (battle: BattleState, character: BattleCharacter, targets: BattleCharacter[]): BattleState => {
        return battle
            .get(character)!.delay(1)
            .get(character)!.damage(1, [BattleTag.Mechanical])
        ;
    }

}

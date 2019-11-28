import { BattleAbility } from "../../logic/battle/BattleAbility";
import { BattleCharacter } from "../../logic/battle/BattleCharacterState";
import { BattleState } from "../../logic/battle/BattleState";
import { TargetSelf } from "../../logic/battle/TargetLogic";

export const Idle: BattleAbility = {
    
    name: 'Idle',
    getTargets: TargetSelf,

    use: (battle: BattleState, character: BattleCharacter, targets: BattleCharacter[]): BattleState => {
        return battle
            .get(character)!.delay(1)
        ;
    },

}

import { Idle } from "../../data/battleability/Idle";
import { randomChoice } from "../../util/RandomUtil";
import { BattleAbility } from "./BattleAbility";
import { BattleBuff } from "./BattleBuff";
import { BattleCharacterAttributes } from "./BattleCharacterAttributes";
import { BattleAlliance, BattlePosition, BattleState, BattleTag } from "./BattleState";

export type BattleCharacterState = {

    uuid: number;
    name: string;

    position: BattlePosition;
    attributes: BattleCharacterAttributes;
    alliance: BattleAlliance;

    abilities: BattleAbility[];
    buffs: BattleBuff[];

}

export class BattleCharacter {

    private readonly battle: BattleState;
    public readonly state: BattleCharacterState;

    constructor(battle: BattleState | null, state: BattleCharacterState) {
        this.battle = battle === null ? new BattleState(null, []) : battle;
        this.state = state;
    }
    
    public deepCopy(battle: BattleState): BattleCharacter {
        return new BattleCharacter(battle,
        {
            uuid: this.state.uuid,
            name: this.state.name,
            attributes: { ...this.state.attributes },
            position: { ...this.state.position },
            alliance: this.state.alliance,
            abilities: [ ...this.state.abilities ],
            buffs: [ ...this.state.buffs ],
        });
    }

    public isAlive(): boolean {
        return this.state.attributes.healthCurrent > 0;
    }

    public isActive(): boolean {
        return this.state.attributes.delay <= 0;
    }

    public getRandomAbility(battle: BattleState): BattleAbility {
        const abilities: BattleAbility[] = this.state.abilities.filter(ability => ability.getTargets(battle, this).length !== 0);
        return abilities.length === 0 ? Idle : randomChoice(abilities);
    }

    public getDefense(tags: BattleTag[]): number {
        return 0;
    }

    public setDelay(amount: number): BattleState {
        const next: BattleState = this.battle.deepCopy();
        next.get(this)!.state.attributes.delay = amount;
        return next;
    }

    public setHealthCurrent(amount: number): BattleState {
        const next: BattleState = this.battle.deepCopy();
        next.get(this)!.state.attributes.healthCurrent = Math.max(0, amount);
        return next;
    }

    public damage(amount: number, tags: BattleTag[]): BattleState {
        const damageDealt: number = amount - this.getDefense(tags);
        if (damageDealt <= 0) return this.battle;
        
        return this
            .setHealthCurrent(this.state.attributes.healthCurrent - damageDealt)
            .log(`${ this.state.name } takes ${ damageDealt } damage`)
        ;
    }

    public delay(amount: number): BattleState {
        return this.setDelay(this.state.attributes.delay + amount);
    }

}

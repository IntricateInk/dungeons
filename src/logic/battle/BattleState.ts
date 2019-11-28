import { randomChoice } from "../../util/RandomUtil";
import { BattleAbility } from "./BattleAbility";
import { BattleCharacter } from "./BattleCharacterState";

export enum BattleAlliance {
    Player,
    Enemy,
};

export enum BattleTag {
    Electrical = 'Electrical',
    Thermal = 'Thermal',
    Digital = 'Digital',
    Mechanical = 'Mechanical',
};

export type BattleRow = 0 | 1 | 2 | 3;
export type BattleCol = 0 | 1;
export type BattlePosition = { row: BattleRow, col: BattleCol };

export class BattleState {

    public readonly previousState: BattleState | null;
    public readonly characters: BattleCharacter[];
    public readonly combatLog: string[];

    constructor(previousState: BattleState | null, characters: BattleCharacter[], combatLog: string[] = []) {
        this.previousState = previousState;
        this.characters = characters.map(c => c.deepCopy(this));
        this.combatLog = combatLog;
    }
    
    public deepCopy(): BattleState {
        return new BattleState(this, this.characters, [...this.combatLog]);
    }

    public get(character: BattleCharacter): BattleCharacter | undefined {
        return this.characters.find(c => c.state.uuid === character.state.uuid);
    }

    public runBattle(): BattleState {
        return this.isFinished() ? this : this.doTurn().runBattle();
    }
    
    public doTurn(): BattleState {
        if (!this.hasActiveCharacter()) return this.doSpeedTick();

        const actingCharacter: BattleCharacter = this.getActiveCharacter();
        const ability: BattleAbility = actingCharacter.getRandomAbility(this);
        const targets: BattleCharacter[] = randomChoice(ability.getTargets(this, actingCharacter));

        const message: string = `${actingCharacter.state.name} uses ${ability.name} on ${targets.reduce((s, c) => s + c.state.name, '')}`;
        const next: BattleState = ability.use(this.log(message), actingCharacter, targets);
        return next;
    }

    public doSpeedTick(): BattleState {
        const next: BattleState = this.deepCopy();
        next.characters.forEach(c => c.state.attributes.delay -= c.state.attributes.speed);
        return next;
    }

    public hasActiveCharacter(): boolean {
        return this.characters.some(c => c.isActive());
    }

    public getActiveCharacter(): BattleCharacter {
        const minDelay: number = Math.min(...this.characters.map(c => c.state.attributes.delay));
        return randomChoice(this.characters.filter(c => c.state.attributes.delay === minDelay));
    }

    public isFinished(): boolean {
        return (
            this.characters.filter(c => c.state.alliance === BattleAlliance.Enemy && c.isAlive()).length === 0 ||
            this.characters.filter(c => c.state.alliance === BattleAlliance.Player && c.isAlive()).length === 0
        );
    }

    public log(message: string): BattleState {
        const next: BattleState = this.deepCopy();
        next.combatLog.push(message);
        return next;
    }

}

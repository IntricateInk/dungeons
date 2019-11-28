import React from 'react';
import { BattleCharacter, BattleCharacterState } from "../logic/battle/BattleCharacterState";
import { BattleAlliance } from '../logic/battle/BattleState';

type Props = {
    character: BattleCharacter;
};

function RenderCharacter(props: Props) {
    const state: BattleCharacterState = props.character.state;
    return (
        <div style={ { backgroundColor: state.alliance === BattleAlliance.Player ? 'green' : 'red' } }>
            <div>{ state.name } ({ state.attributes.healthCurrent } / { state.attributes.healthMaximum })</div>
            <div>Delay: { state.attributes.delay }</div>
            <div>Speed: { state.attributes.speed }</div>
            { Object.keys(state).map(k => <div>{k}: { JSON.stringify((state as any)[k]) }</div>) }
        </div>
    );
}

export const CharacterComponent = RenderCharacter;

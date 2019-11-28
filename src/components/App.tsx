import React, { useState } from 'react';
import { Poke } from '../data/battleability/Poke';
import { BattleCharacterState, BattleCharacter } from '../logic/battle/BattleCharacterState';
import { BattleAlliance, BattleState } from '../logic/battle/BattleState';
import { CharacterComponent } from './CharacterComponent';

const testChars: BattleCharacterState[] = [
  {
      uuid: 0,
      name: 'TestChar1',
      position: { row: 0, col: 0 },
      attributes: {
        healthCurrent: 5,
        healthMaximum: 5,
        delay: 1,
        speed: 5,
      },
      alliance: BattleAlliance.Player,
      abilities: [Poke],
      buffs: [],
  },
  
  {
    uuid: 1,
    name: 'TestChar2',
    position: { row: 0, col: 0 },
    attributes: {
      healthCurrent: 5,
      healthMaximum: 5,
      delay: 1,
      speed: 5,
    },
    alliance: BattleAlliance.Enemy,
    abilities: [Poke],
    buffs: [],
  },

];
const testBattle: BattleState = new BattleState(null, testChars.map(cs => new BattleCharacter(null, cs)));
let currBattle: BattleState = testBattle;

function App() {

  const [a, setA] = useState(0);

  return (
    <>
      <div>
        { currBattle.characters.map(c => <CharacterComponent character={ c }/>) }
      </div>
      <button onClick={ () => { currBattle = currBattle.runBattle(); setA(a + 1); } }>Next</button>
      <div>
        { currBattle.combatLog.map(line => <div>{ line }</div>) }
      </div>
    </>
  );
}

export default App;

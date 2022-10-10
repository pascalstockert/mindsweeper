import { FieldTypes } from './types/FieldTypes.enum';
import { Field } from './classes/Field.class';
import { Map } from './classes/Map.class';

const domFieldRef = document.getElementById('field-of-fate') as HTMLDivElement;

/**
 * 4x4 test-field
 */
const { empty, bomb } = FieldTypes;
const fieldArray: FieldTypes[][] = [
  [ bomb, bomb, empty, empty, empty, empty, empty, empty ],
  [ empty, bomb, empty, empty, empty, empty, empty, empty ],
  [ empty, empty, empty, empty, empty, empty, empty, empty ],
  [ empty, empty, empty, empty, bomb, empty, empty, empty ],
  [ empty, empty, empty, empty, bomb, empty, empty, empty ],
  [ empty, empty, empty, empty, empty, empty, empty, empty ],
  [ empty, empty, empty, empty, empty, empty, empty, empty ],
  [ empty, empty, empty, empty, empty, empty, empty, empty ],

];

new Map(
  domFieldRef,
  fieldArray.map( ( fieldRow: FieldTypes[], y: number ) => {
    return fieldRow.map( ( field: FieldTypes, x: number ) => {
      return new Field( field, { x, y } );
    } )
  } )
)

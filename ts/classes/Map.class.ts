import { Field } from './Field.class';
import { FieldTypeImageSources, FieldTypes } from '../types/FieldTypes.enum';
import { ImageLoader } from './ImageLoader.class';

export class Map {
  domFieldRef: HTMLDivElement;
  static map: Field[][];

  constructor(
    domFieldRef: HTMLDivElement,
    fieldArray: Field[][],
  ) {
    Map.map = fieldArray;

    ImageLoader.preloadImages(
      FieldTypeImageSources[FieldTypes.hidden],
      FieldTypeImageSources[FieldTypes.empty],
      FieldTypeImageSources[FieldTypes.bomb],
      FieldTypeImageSources[FieldTypes.flag],
    )

    this.domFieldRef = domFieldRef;

    fieldArray.forEach( row => {
      this.paintRow( row );
    } );
  }

  paintRow( row: Field[] ): void {
    const fieldRowRef = document.createElement('div');
    fieldRowRef.classList.add('field-row')
    row
      .map( field => field.getTagRef() )
      .forEach( fieldRef => fieldRowRef.appendChild( fieldRef ));
    this.domFieldRef.appendChild( fieldRowRef );
  }

  static countAdjescentBombs( map: Field[][], x: number, y: number ): number {
    // Move index of clicked position for easier looping
    x -= 1;
    y -= 1;

    const [ height, width ] = [ map.length, map[0].length ];
    let sum = 0;

    for ( let i = 0; i < 9; i++ ) {

      if (
        x + i % 3 >= 0 &&    // Cover left out-of-bounds
        y + i / 3 >= 0 &&    // Cover top out-of-bounds
        x + i % 3 < width && // Cover right out-of-bounds
        y + i / 3 < height   // Cover bottom out-of-bounds
      ) {
        sum += Number( map[ y + Math.floor( i / 3 ) ][ x + i % 3 ].type === FieldTypes.bomb );  
      }

    }
    return sum;
  }

}

import { FieldTypes } from '../types/FieldTypes.enum';
import { ImageLoader } from './ImageLoader.class';
import { Map } from './Map.class';

export class Field {
  public type: FieldTypes;
  private isRevealed: boolean;
  private isFlagged: boolean;
  private tagRef: HTMLImageElement;
  private coordinates: { x: number, y: number };

  constructor( type: FieldTypes, coordinates: { x: number, y: number } ) {
    this.type = type;
    this.coordinates = coordinates;

    const tagRef = document.createElement( 'img' );
    tagRef.src = '/assets/hidden.png';
    tagRef.draggable = false;
    tagRef.style.userSelect = 'none';
    tagRef.classList.add( 'field' );
    tagRef.onclick = this.reveal.bind( this );
    tagRef.addEventListener( 'contextmenu', this.flag.bind( this ) );
    this.tagRef = tagRef
  }

  flag( event: MouseEvent ): void {
    event.preventDefault();

    if ( this.isRevealed ) {
      return;
    }

    if ( this.isFlagged ) {
      this.tagRef.src = ImageLoader.getCachedUrl( this.isRevealed ? `assets/${this.type}.png` : '/assets/hidden.png' );
    } else {
      this.tagRef.src = ImageLoader.getCachedUrl( `assets/flag.png` );
    }

    this.isFlagged = !this.isFlagged;
  }

  reveal(): void {
    if ( !this.isFlagged ) {
      console.log( Map.countAdjescentBombs( Map.map, this.coordinates.x, this.coordinates.y ) );
      this.isRevealed = true;
      this.tagRef.src = ImageLoader.getCachedUrl( `assets/${this.type}.png` );
      this.tagRef.onclick = () => {};
    }
  }

  highlight(): void {
    this.tagRef.style.border = '2px solid rgba(0, 255, 255, 0.4)';
    this.tagRef.style.boxSizing = 'border-box';
  }

  getTagRef(): HTMLImageElement {
    return this.tagRef;
  }
}

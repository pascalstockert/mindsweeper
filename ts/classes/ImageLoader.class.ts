export class ImageLoader {
  static cachedBlobUrls: {[key: string]: string} = {}

  static preloadImages(...images: string[]): void {
    images.forEach(imageUrl => {
      fetch( imageUrl )
        .then( res => res.blob() )
        .then( blob => {
          this.cachedBlobUrls[ imageUrl ] = URL.createObjectURL( blob as Blob );
        } );
      const image = new Image();
      image.src = imageUrl;
    });
  }

  static getCachedUrl( url: string ): string {
    if ( url in this.cachedBlobUrls ) {
      return this.cachedBlobUrls[ url ];
    }
    this.preloadImages( url );
    return url;
  }
}
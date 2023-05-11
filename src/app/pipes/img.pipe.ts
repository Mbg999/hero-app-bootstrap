import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(url: string): string {
    return url && (url.startsWith('http://') || url.startsWith('https://')) ? url : 'assets/imgs/no-img.png';
  }

}

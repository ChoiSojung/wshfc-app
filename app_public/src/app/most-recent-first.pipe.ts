import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostRecentFirst'
})
export class MostRecentFirstPipe implements PipeTransform {

  private compare(a, b) {
    const createdOnA = a.created;
    const createdOnB = b.created;

    let comparison = 1;
    if (createdOnA > createdOnB) {
      comparison = -1;
    }
    return comparison;
  }

  transform(reviews: any[]): any[] {
    if (reviews && reviews.length) {
      return reviews.sort(this.compare);
    }

    return null;
  }


}

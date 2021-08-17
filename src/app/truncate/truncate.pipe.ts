import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, [limit, trail = '...']: [number, string]): string {
    return value.length > limit
      ? value.replace(/<[^>]*>/g, '').substring(0, limit) + trail
      : value.replace(/<[^>]*>/g, '');
  }
}

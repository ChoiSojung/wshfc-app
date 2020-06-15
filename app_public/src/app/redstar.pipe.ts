import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'redstar'
})
export class RedstarPipe implements PipeTransform {

  transform(text: string): string {
    if(text.includes("*")){
		var str = text.replace('*', '<span style="color: red">*</span>');
		return str;
	} else {
		return text;
	}
  }
}

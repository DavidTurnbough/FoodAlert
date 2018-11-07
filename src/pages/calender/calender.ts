import { Component } from '@angular/core';

import { PageService } from '../../providers/PageService';

@Component({
  selector: 'page-Calender',
  templateUrl: 'calender.html'
})

export class CalenderPage{

  constructor() {
  }

  goHome(key)
  {
    this.pageService.goHome(key);
  }
}

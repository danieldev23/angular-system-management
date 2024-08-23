import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyBaseComponent } from 'src/app/modules/my-base.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './template.component.html'
})
export class AdminLayoutComponent extends MyBaseComponent {
  // id: number = Number(this.route.snapshot.paramMap.get('id'));
  
  

  constructor(private route: ActivatedRoute) {
    super();
  }
  override ngOnInit(): void {
      
  }
}

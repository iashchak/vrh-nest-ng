import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, RouterModule, NgbModule],
  exports: [NavigationComponent],
})
export class ComponentsModule {}

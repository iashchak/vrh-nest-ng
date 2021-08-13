import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, MdbCollapseModule, MdbDropdownModule],
  exports: [NavigationComponent],
})
export class ComponentsModule {}

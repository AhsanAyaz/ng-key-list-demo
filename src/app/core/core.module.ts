import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './components/list-item/list-item.component';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    ListItemComponent,
    FilterByNamePipe
  ],
  exports: [
    ListItemComponent,
    FilterByNamePipe
  ],
  providers: [
    UsersService
  ]
})
export class CoreModule { }

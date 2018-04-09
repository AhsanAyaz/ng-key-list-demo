import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UsersService } from './core/services/users.service';
import { first } from 'rxjs/operators';
import { ListKeyManager } from '@angular/cdk/a11y';
import { ListItemComponent } from './core/components/list-item/list-item.component';
import { UP_ARROW, DOWN_ARROW, ENTER } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: any;
  isLoadingUsers: boolean;
  keyboardEventsManager: ListKeyManager<any>;
  searchQuery: string;
  @ViewChildren(ListItemComponent) listItems: QueryList<ListItemComponent>;
  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.isLoadingUsers = true;
    this.usersService.getUsers()
      .pipe(
        first()
      )
      .subscribe(users => {
        this.users = users;
        this.isLoadingUsers = false;
        this.keyboardEventsManager = new ListKeyManager<any>(this.listItems);
        this.initKeyManagerHandlers();
      });
  }

  /**
   * @author Ahsan Ayaz
   * @desc Shows the selected user's details when the item is selected
   * using the Enter key
   */
  showUserInfo(user) {
    alert(`The user selected has email ${user.email}`);
  }

  /**
   * @author Ahsan Ayaz
   * @desc Listens to the active navigation item on the keyboardEventsManager instance
   * and triggers the provided function with the active item index
   */
  initKeyManagerHandlers() {
    this.keyboardEventsManager
      .change
      .subscribe((activeIndex) => {
        // when the navigation item changes, we get new activeIndex
        this.listItems.map((item, index) => {
          // set the isActive `true` for the appropriate list item and `false` for the rest
          item.setActive(activeIndex === index);
          return item;
        });
      });
  }

  /**
   * @author Ahsan Ayaz
   * @desc Triggered when a key is pressed while the input is focused
   */
  handleKeydown(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    if (this.keyboardEventsManager) {
      if (event.keyCode === DOWN_ARROW || event.keyCode === UP_ARROW) {
        // passing the event to key manager so we get a change fired
        this.keyboardEventsManager.onKeydown(event);
        return false;
      } else if (event.keyCode === ENTER) {
        // when we hit enter, the keyboardManager should call the selectItem method of the `ListItemComponent`
        this.keyboardEventsManager.activeItem.selectItem();
        return false;
      }
    }
  }
}

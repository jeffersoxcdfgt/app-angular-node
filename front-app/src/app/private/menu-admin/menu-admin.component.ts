import { Component, OnInit , HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { isLogged } from '../store/reducers/login.reducers';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  currentuser = '';
  valuestyle = 'none';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(isLogged).subscribe( data => {
      if (data != null){
        this.currentuser = data.currentuser;
      }
    });
  }

  toggleDropdown = () =>  this.valuestyle = this.valuestyle === 'none' ? 'block' : 'none';

  @HostListener('document:click')
  clickedOut = () => {
  }


}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { isLogged } from '../store/reducers/login.reducers';
import { userIslogged } from '../store/actions/login.actions';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(isLogged).subscribe( data => {
      if(data!=null){
        console.log(data)
        this.store.dispatch(userIslogged({ user:data.currentuser})); 
      }                 
    });
  }
}

import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  @Input() message: string;
  showAlert = 'none';

  constructor() { }

  ngOnInit(): void { }

  close = () => this.showAlert  = 'none';
  open = () =>  this.showAlert = 'block';
}

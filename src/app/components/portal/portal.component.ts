import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  buttons = [
    {
      name: 'Display authors',
      target: 'authors'
    },
    {
      name: 'Display webcomics',
      target: 'webcomics'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

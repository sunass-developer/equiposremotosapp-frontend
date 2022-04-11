import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Menu } from './../../_model/menu';
import { MenuService } from './../../_service/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  options: FormGroup;
  menus  : Menu[] = [];

  constructor(
    fb: FormBuilder,
    private menuService : MenuService,
    private router : Router
  ) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  ngOnInit() {
  }

  login(){
    this.router.navigate(['login']);
    //this.router.navigate(['principal']);
  }

}

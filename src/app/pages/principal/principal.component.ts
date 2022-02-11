import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReportesComponent } from './../reportes/reportes.component';
import { Menu } from './../../_model/menu';
import { MenuService } from './../../_service/menu.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  options: FormGroup;
  menus  : Menu[] = [];

  constructor(
    fb: FormBuilder,
    /*public dialog: MatDialog,*/
    private menuService : MenuService
  ) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  ngOnInit() {
    /*console.log("ngOnInit");
    this.menuService.getMenuCambio().subscribe(data=>{
      console.log("data ngOnInit => " + data);
      this.menus = data;
    });*/
  }

  /*abrirDialogo(){
    this.dialog.open(ReportesComponent,{
      width : '70%'
    });
  }*/

}
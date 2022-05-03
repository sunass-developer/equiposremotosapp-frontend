import { Component, OnInit } from '@angular/core';
import { Menu } from './_model/menu';
import { MenuService } from './_service/menu.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { Router } from '@angular/router';
import { LoginService } from './_service/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  options: FormGroup;
  menus  : Menu[] = [];

  constructor(
    fb: FormBuilder,
    public dialog: MatDialog,
    private menuService : MenuService,
    private router : Router,
    public loginService : LoginService
  ) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  ngOnInit() {
    this.menuService.getMenuCambio().subscribe(data=>{
      this.menus = data;
    });
  }

  abrirDialogo(nombre : string){

    switch(nombre){
      case 'Inicio' : 
        this.router.navigate(['principal']);
        break;
      case 'Usuarios' :
        this.router.navigate(['usuarios']);
        break;
      case 'Estación' : 
        this.router.navigate(['estacion']);
        break;
      case 'Receptores SMS' : 
        this.router.navigate(['receptorsms']);
        break;      
      case 'Reportes' : 
        this.dialog.open(ReportesComponent,{
          width : '70%'
        });
        break;
    }    
  }
  
}

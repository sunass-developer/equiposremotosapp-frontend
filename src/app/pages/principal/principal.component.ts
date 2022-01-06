import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }
}

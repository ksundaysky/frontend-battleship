import { Component, OnInit } from '@angular/core';
import { resolveDefinition } from '@angular/core/src/view/util';
import { Router } from '@angular/router'

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  form:any = {};
  constructor(private router:Router) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.form);

    console.log(location.host)
    document.location.href = location.host+'/home';
    document.location.replace(location.host+'/home');


  }


}

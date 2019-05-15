import { Component, OnInit } from '@angular/core';
import { resolveDefinition } from '@angular/core/src/view/util';
import { Router } from '@angular/router'
import { Config } from './config';
import { ConfigService } from './config.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  form:any = {};
  errorMessage: string;
  constructor(private router:Router, private configService: ConfigService) { }


  ngOnInit() {
  }


  onSubmit(f: NgForm) {
    console.log(f.value.whoStarts);
    var boolValue = JSON.parse(f.value.whoStarts);
    let config = new Config(f.value.name, f.value.dimension, boolValue, f.value.gameType);
    console.log(config);

    this.configService.postConfig(config).subscribe(
      data => {
        console.log(data);
     },
      error => {
       this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    )
    this.router.navigateByUrl("/game");
  }
  // onSubmit(){
  //   console.log(this.form);

  //   console.log(location.host)
  //   // document.location.href = location.host+'/game';
  //   // document.location.replace(location.host+'/game');

  //   let config = new Config(this.form.dimension,this.form.whoStarts,this.form.gameType);

  //   // this.configService.postConfig(config).subscribe(
  //   //   data => {
  //   //     console.log(data);
  //   //  },
  //   //  error => {
  //   //    this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
  //   //  }
  //   // )
  
  //   this.router.navigateByUrl("/game");
  // }


}

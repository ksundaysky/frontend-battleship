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
    var boolValue = JSON.parse(f.value.whoStarts);
    let config = new Config(f.value.name, f.value.dimension, boolValue, f.value.gameMode);
    console.log(config)

    this.configService.postConfig(config).subscribe(
      data => {
        const id = data;
        const endpointPath = 'ships_placement/' + id;
        this.router.navigateByUrl(endpointPath);
     },
      error => {
       this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    )
    
  }

}

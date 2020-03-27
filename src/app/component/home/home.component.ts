import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import {ApiService} from './../../api.service';
import { from } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(FormGroupDirective, {static: false}) formDirective: FormGroupDirective;
  public myForm: FormGroup;

  constructor(public formbuilder: FormBuilder,public apiService:ApiService,public cookie:CookieService) { 
    // this.apiService.gettemptoken().subscribe((res: any) => {
    //   this.cookie.set('jwtToken', res.token);
    // });
    this.myForm=this.formbuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      phone: ['', Validators.required],
      companyname: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      governmentpurchase: ['', Validators.required],
      medicalfacility:[],
      businessphone:[],
      mobilephone:[],
      mask:[]
    });
  }

  ngOnInit() {
  }
  submit(){}
}

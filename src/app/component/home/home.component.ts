import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import {ApiService} from './../../api.service';
import { from } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(FormGroupDirective, {static: false}) formDirective: FormGroupDirective;
  public myForm: FormGroup;
public selected:any;
  constructor(public dialog: MatDialog,public formbuilder: FormBuilder,public apiService:ApiService,public cookie:CookieService) { 
    // this.apiService.gettemptoken().subscribe((res: any) => {
    //   this.cookie.set('jwtToken', res.token);
    // });
    this.myForm=this.formbuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      phone: ['', Validators.required],
      companyname: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      governmentpurchase: ['', Validators.required],
      medicalfacility:[],
      businessphone:[],
      noofmasks:[]
    });
  }

  ngOnInit() {
  }
  submit(){
    this.openTermsDialog();
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    console.warn('test');
  }

  openTermsDialog() {            //demo for dialog 
    const dialogRef = this.dialog.open(Success, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './Smodal.html',
})
export class Success {

  constructor(
    public dialogRef: MatDialogRef<Success>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import {ApiService} from './../../api.service';
import { from } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MetaService } from '@ngx-meta/core';
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
  public youtubeFlage:boolean=false;
  public selected:any;
  public hideSpan:boolean=true;
  constructor( public meta: MetaService,public dialog: MatDialog,public formbuilder: FormBuilder,public apiService:ApiService,public cookie:CookieService) { 
    this.apiService.gettemptoken().subscribe((res: any) => {
      this.cookie.set('jwtToken', res.token);
    });
    this.hideSpan=true;
    this.meta.setTitle('Virus Barrier Medical Face Mask');
    // this.meta.update({ name: 'description', content: 'Dynamic Hello Angular Lovers description!' });
    this.meta.setTag('og:description', 'Virus Barrier Medical Face Mask to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Barrier Medical Face Mask to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Barrier Medical Face Mask, Medical Face Mask, Medical Face Mask for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Barrier Medical Face Mask, Medical Face Mask, Medical Face Mask for Virus');

    this.meta.setTag('og:title', 'Virus Barrier Medical Face Mask');
    this.meta.setTag('twitter:title', 'Virus Barrier Medical Face Mask');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://virusmedicalmask.com');
      this.meta.setTag('og:image', 'https://all-frontend-assets.s3.amazonaws.com/bvt-mask-assetc/images/144-144.png');


    this.myForm=this.formbuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      phone: ['', Validators.required],
      companyname: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      governmentpurchase: ['', Validators.required],
      medicalfacility:['',Validators.required],
      businessphone:['',Validators.required],
      noofmasks:['',Validators.required],
      reference:['']
    });
  }

  ngOnInit() {
  }

    /**show video modal on click of thamnail function by sourav */
    fetchvideo(){
      
      this.youtubeFlage=true;
      this.hideSpan=false;
      console.log(this.youtubeFlage);
      console.log(this.hideSpan);
      // const dialogRef = this.dialog.open(VideoPlayer, {
      //   panelClass: 'custom-modalbox-videoplayer-preview',
      //   height: 'auto',
      // });
    }  


    /**submit function */
  submit(){
  
       
   
    for (let i in this.myForm.controls) {
      this.myForm.controls[i].markAsTouched();
    }
    if (this.myForm.valid) {

      console.log(this.myForm.value);
      let data = {
        
          "source":"data_medicalmask",
          "data":this.myForm.value,       
      };
      this.apiService.addDataWithoutToken(data, 'addorupdatedata').subscribe((res:any) => {

       //console.warn(res);
       if(res.msg=="We’ve sent an email to this address to reset your password"){
        this.myForm.reset();
        this.openTermsDialog();
       }
       

        
      });
    }
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
      panelClass: ['modal-sm', 'infomodal'],
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
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

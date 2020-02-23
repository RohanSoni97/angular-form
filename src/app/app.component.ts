import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-form';
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  fobbidenUserName = ['Gayle', 'Donal' ]; 
  ngOnInit() {
    this.signUpForm = new FormGroup({
      'username' : new FormControl(null,[Validators.required, this.forbiddenNames.bind(this)]),
      'email' : new FormControl(null,[Validators.required,Validators.email],this.forbiddenEmails),
      'gender' : new FormControl('male'),
      'hobbies' : new FormArray([],Validators.required)
    });
    this.signUpForm.valueChanges.subscribe(
      (value) => {
        console.log(value);
      }
    );
  }
  onSubmit() {
    console.log(this.signUpForm);
  }
  addHobby() {
    const control = new FormControl(null);
    (<FormArray> this.signUpForm.get('hobbies')).push(control);
  }
  forbiddenNames(control : FormControl) : { [s: string] : boolean} {
    if ( this.fobbidenUserName.indexOf(control.value) != -1) {
    return {' nameIsForbidden ': true};
    }
    return {' nameIsForbidden ': false};
  }
  forbiddenEmails(control : FormControl) : Promise<any> | Observable<any>
  {
    const promise = new Promise <any>( (resolve,reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com')
        {
          resolve ({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }
      ,1500);
    });
    return promise;
  }
}

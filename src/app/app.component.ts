import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

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
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'gender' : new FormControl('male'),
      'hobbies' : new FormArray([],Validators.required)
    });
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
}

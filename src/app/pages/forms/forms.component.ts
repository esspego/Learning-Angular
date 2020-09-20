import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalvalidatorsService } from '../../services/personalvalidators.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  form: FormGroup;

  constructor( private fb: FormBuilder, private validators: PersonalvalidatorsService) {
    this.createForm();
    this.saveForm();
    this.completeForm();
    this.createListener();
  }

  ngOnInit(): void {
  }

  get hobbies(){
    return this.form.get('hobbies') as FormArray;
  }
  get passInvalid(){
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;
    return(pass1 === pass2) ? false : true;
  }
  inputInvalid(label: string){
    return this.form.get(label).invalid && this.form.get(label).touched;
  }

  /* ASÍ DE FORMA INDIVIDUALIZADA
  get surnameInvalid(){
    return this.form.get('surname').invalid && this.form.get('surname').touched;
  } */

  createForm(){
    this.form = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(5)], this.validators.userTaken],
      name: ['', [Validators.required, Validators.minLength(5)]],
      surname: ['', [Validators.required, Validators.minLength(5), this.validators.noHerrera]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass1: ['', [Validators.required, Validators.minLength(5)]],
      pass2: ['', [Validators.required, Validators.minLength(5)]],
      hobbies: this.fb.array([],[],[]),
      address: this.fb.group({
        district: ['', Validators.required],
        city: ['', Validators.required],
      })
    },{
      validators: this.validators.passEqual('pass1', 'pass2')
    });
  }
  completeForm(){
    /* También se podría utilizar this.form.setValue  */
    this.form.reset({
      name: 'Esperanza',
      surname: 'García',
      email: 'espe_1993@hotmail.com',
      address: {
        district: 'Málaga',
        city: 'Málaga'
      }
    });
    ['Comer', 'Dormir'].forEach(value => this.hobbies.push(this.fb.control(value)));
    /* También se podrían añadir datos mediante el setValue */
  }
  createListener(){
    /* this.form.valueChanges.subscribe(value =>{
      console.log(value);
    });
    this.form.statusChanges.subscribe( status =>{
      console.log(status)
    }) */
    this.form.get('name').valueChanges.subscribe(value => {
      console.log(value)
    })
  }
  addHobbie(){
    this.hobbies.push(this.fb.control('', Validators.required));
  }
  deleteHobbie( i: number){
    this.hobbies.removeAt(i);
  }

  saveForm(){
    console.log(this.form);
    if (this.form.invalid){
      return Object.values(this.form.controls).forEach(control => {
        if ( control instanceof FormGroup) {
          Object.values( control.controls).forEach( control => control.markAllAsTouched() );
        }else{
          control.markAsTouched();
        }
      });
    }
    console.log(this.hobbies)
    this.form.reset({

    });
  }


}

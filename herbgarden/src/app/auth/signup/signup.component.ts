import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth-service";

@Component({
    templateUrl:'signup.component.html'
})
export class SignUpComponent{
    pageTitle='Signup';
    isLoading=false;
    constructor(private authService:AuthService){}
    onSignUp(form:NgForm)
    {
        if(form.invalid){
            return;
        }
        this.isLoading=true;
        this.authService.createUser(form.value.email,form.value.password)
    }
}
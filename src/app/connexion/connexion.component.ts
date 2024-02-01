import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { Utilisateur } from '../shared/services/eltDefinitions';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {


  public bsNotAccount = new BehaviorSubject<boolean>(true);

  protected obsUserBD$: Observable<Utilisateur| undefined> |undefined;

  bsMessageError = new BehaviorSubject<string>("");

  user: Utilisateur | void = void 0;

  public fgLogin = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  })

  public fgRegister = new FormGroup({
    nom: new FormControl("", [Validators.required, Validators.minLength(2)]),
    prenom: new FormControl("", [Validators.required, Validators.minLength(2)]),
    dateNaissance: new FormControl(new Date(), [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    telephone: new FormControl("", [Validators.required, Validators.minLength(10)]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    passwordCheck: new FormControl("", [Validators.required, Validators.minLength(6)])
  })


  constructor(private us: UserService,
              private fb: FormBuilder,
              private router: Router,
              private api: ApiService) {

    this.us.obsFestiUsers$.subscribe(
      u => {
        if (u === undefined) {
          this.fgLogin.controls.email.setValue("")
          this.fgLogin.controls.password.setValue("")
        } else {
          this.fgLogin.controls.email.setValue(u.email)
        }
      }
    )
  }


  async login() {
    
    const retour = await this.us.loginMail(<string>this.fgLogin.controls.email.value, <string>this.fgLogin.controls.password.value)
    this.bsMessageError.next(retour)
    
    if (this.us.bsAuth.value) {
      this.router.navigateByUrl("")
    } else {
      this.router.navigateByUrl("connexion")
    }
  }

  async register() {

    this.user = await this.us.registerMail(<string>this.fgRegister.controls.nom.value, <string>this.fgRegister.controls.prenom.value, <Date>this.fgRegister.controls.dateNaissance.value, <string>this.fgRegister.controls.email.value, <string>this.fgRegister.controls.password.value, <string>this.fgRegister.controls.telephone.value)

    if (this.user) {
      await this.api.postUtilisateur(this.user)

      this.router.navigateByUrl("")
    } else {
      this.router.navigateByUrl("connexion")
    }
  }

  async loginGoogle() {
    this.user = await this.us.login()
    
    const userExist = await this.api.getUtilisateurByEmail(this.user?.email!)

    if (!userExist) {
      this.user = await this.api.postUtilisateur(this.user)
    } else {
      this.user = userExist
    }
    
    this.router.navigateByUrl("")
  }

  backToConnexion() {
    this.bsNotAccount.next(true);
    this.router.navigateByUrl("connexion")
  }

}
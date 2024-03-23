import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ServiceModel } from '../service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
    user!:any;

  public newService: ServiceModel = {
    id: 0,
    prestataire: '',
    name: '',
    subcategorie: '',
    categorie: '',
    prix: 0,
    imageUrl: ''
  };

  @Output() serviceAdded: EventEmitter<ServiceModel> = new EventEmitter();

  constructor(private Ms:AuthService,private router: Router,private serviceService: ServiceService ){
    this.Ms.getUserClaims().then((u)=>{
      this.user=u;
      if(!!this.user)console.log(this.user.displayName)
    })

  }
  logout():void{
    this.Ms.doLogout().then(()=>{
      this.router.navigate(['/login'])
    
    })
      }

  ngOnInit(): void {
    // Initialize component
  }

  public onAddService(addServiceForm: NgForm): void {
    this.serviceService.addService(this.newService).subscribe(
      (response: ServiceModel) => {
        console.log('Service added:', response);
        addServiceForm.resetForm();
        this.serviceAdded.emit(response);
        this.router.navigateByUrl('/home', { state: { service: response } });
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        // Handle error
      }
    );
  }
}

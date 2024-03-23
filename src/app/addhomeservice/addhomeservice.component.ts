// addhomeservice.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceModel } from '../service';
import { ServiceService } from '../service.service';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-addhomeservice',
  templateUrl: './addhomeservice.component.html',
  styleUrls: ['./addhomeservice.component.css']
})
export class AddhomeserviceComponent implements OnInit {
  user: any;
  addedService: ServiceModel | undefined;
  services: ServiceModel[] = [];
  serviceAdded$ = this.serviceService.serviceAdded$;
  editService: ServiceModel | null = null;
  deleteService: ServiceModel | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.addedService = history.state.service;
    this.getServices();
    this.serviceAdded$.subscribe((addedService) => {
      this.services.push(addedService);
    });

    this.authService.getUserClaims().then((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.doLogout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  getServices(): void {
    this.serviceService.getServices().subscribe(
      (data: ServiceModel[]) => {
        this.services = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onAddService(form: any): void {
    const newService: ServiceModel = {
      name: form.value.name,
      subcategorie: form.value.subCategory,
      categorie: form.value.category,
      prix: form.value.price,
      imageUrl: form.value.imageUrl,
      id: 0,
      prestataire: ''
    };

    this.serviceService.addService(newService).subscribe(
      (addedService: ServiceModel) => {
        this.services.push(addedService);
        this.addedService = addedService;
        this.serviceService.emitServiceAdded(addedService);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onUpdateService(service: ServiceModel): void {
    this.serviceService.updateService(service).subscribe(
      (updatedService: ServiceModel) => {
        const index = this.services.findIndex((s) => s.id === updatedService.id);
        if (index !== -1) {
          this.services[index] = updatedService;
        }
        // Close the modal after successful update
        const modalElement = document.getElementById('updateServiceModal');
        if (modalElement) {
          modalElement.classList.remove('show');
          modalElement.style.display = 'none';
          document.body.classList.remove('modal-open');
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onDeleteService(serviceId: number): void {
    this.serviceService.deleteService(serviceId).subscribe(
      () => {
        const index = this.services.findIndex((s) => s.id === serviceId);
        if (index !== -1) {
          this.services.splice(index, 1);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onOpenModal(service: ServiceModel | null, action: string): void {
    const container = document.getElementById('main-container');
    if (container) {
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
  
      if (action === 'add') {
        button.setAttribute('data-target', '#addServiceModal');
      } else if (action === 'edit' && service) {
        this.editService = { ...service }; // Create a copy of the service to avoid modifying the original
        if (this.editService) {
          button.setAttribute('data-target', '#updateServiceModal');
        }
      } else if (action === 'delete' && service) {
        this.deleteService = service;
        button.setAttribute('data-target', '#deleteServiceModal');
      }
  
      container.appendChild(button);
      button.click();
    }
  }}
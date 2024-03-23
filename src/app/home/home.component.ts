import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceModel } from '../service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addedService: ServiceModel | undefined;
  services: ServiceModel[] = []; // Declare the services property

  constructor(private route: ActivatedRoute, private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.addedService = history.state.service;
    this.getServices(); // Call the method to fetch services when component initializes
  }

  // Method to fetch services from the server
  getServices(): void {
    this.serviceService.getServices()
      .subscribe(
        (data: ServiceModel[]) => {
          this.services = data; // Assign the fetched services to the services property
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ServiceModel } from './service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiServerUrl = environment.apiBaseUrl;
  private serviceAddedSource = new Subject<ServiceModel>();

  serviceAdded$ = this.serviceAddedSource.asObservable();

  constructor(private http: HttpClient) { }

  getServices(): Observable<ServiceModel[]> {
    return this.http.get<ServiceModel[]>(`${this.apiServerUrl}/service/all`);
  }

  addService(service: ServiceModel): Observable<ServiceModel> {
    return this.http.post<ServiceModel>(`${this.apiServerUrl}/service/add`, service);
  }

  // Emit event when a service is added
  emitServiceAdded(service: ServiceModel): void {
    this.serviceAddedSource.next(service);
  }

  // Method to update a service
  updateService(service: ServiceModel): Observable<ServiceModel> {
    return this.http.put<ServiceModel>(`${this.apiServerUrl}/service/update/${service.id}`, service);
  }

  // Method to delete a service
  deleteService(serviceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/service/delete/${serviceId}`);
  }
}
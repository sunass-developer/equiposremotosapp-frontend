import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { ArchivoDto } from '../_dto/ArchivoDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  url : string = environment.HOST;

  constructor(private http: HttpClient) { }
    
  upload(file: File, id:number){
    const formData: FormData = new FormData();
    formData.append('files', file);
    formData.append('id', id.toString());

    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  uploadPut(file: File, id:number){
    const formData: FormData = new FormData();
    formData.append('files', file);
    formData.append('id', id.toString());

    const req = new HttpRequest('PUT', `${this.url}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

   //Metodo para Obtener los archivos
  getFiles(id  : number){
    return this.http.get<ArchivoDto>(`${this.url}/upload/${id}`);
  }

   //Metodo para borrar los archivos
  deleteFile(filename: string){
    return this.http.get(`${this.url}/delete/${filename}`);
  }
}

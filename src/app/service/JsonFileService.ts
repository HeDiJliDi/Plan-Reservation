import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class JsonFileService {
  private jsonFilePath = './model/DataGrid.json';

  constructor(private http: HttpClient) { }

  // Méthode pour lire les données du fichier JSON
  readData(): Promise<any> {
    return this.http.get(this.jsonFilePath).toPromise();
  }

  // Méthode pour écrire les données dans le fichier JSON
  writeData(data: any): Promise<any> {
    return this.http.post(this.jsonFilePath, data).toPromise();
  }
}


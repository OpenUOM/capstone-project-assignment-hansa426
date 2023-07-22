import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    // Determine the root URL based on the environment (production or development)
    if (environment.production == false) {
      this.ROOT_URL = 'test';
    } else {
      this.ROOT_URL = 'api';
    }
  }

  // Method to initialize the database
  initializeDB() {
    return this.http.get(`/${this.ROOT_URL}/dbinitialize`);
  }

  // Method to retrieve teacher data
  getTeacherData() {
    return this.http.get(`/${this.ROOT_URL}/listTeachers`);
  }

  // Method to retrieve student data
  getStudentData() {
    return this.http.get(`/${this.ROOT_URL}/listStudents`);
  }

  // Method to retrieve information of a single student
  getOneStudentData(payload: Object) {
    return this.http.post(`/${this.ROOT_URL}/getStudentInfo`, payload);
  }

  // Method to retrieve information of a single teacher
  getOneTeacherData(payload: Object) {
    return this.http.post(`/${this.ROOT_URL}/getTeacherInfo`, payload);
  }

  // Method to add a teacher
  addTeacher(payload: Object) {
    return this.http.post(`/${this.ROOT_URL}/addTeacher`, payload);
  }

  // Method to delete a teacher
  deleteTeacher(payload: Object) {
    return this.http.post(`/${this.ROOT_URL}/deleteTeacher`, payload);
  }

  // Method to edit teacher details
  editTeacher(payload: Object) {
    return this.http.post(`/${this.ROOT_URL}/editTeacher`, payload);
  }

  // Method to edit student details
  editStudent(payload: Object) {
    return this.http.post(`/${this.ROOT_URL}/editStudent`, payload);
  }

  // Method to add a student
  addStudent(payload: Object) {
    return this.http.post(`/${this.ROOT_URL}/addStudent`, payload);
  }

  // Method to delete a student
  deleteStudent(payload: Object) {
    return this.http.post(`/${this.ROOT_URL}/deleteStudent`, payload);
  }
}

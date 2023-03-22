import axios from "axios"

export class StudentService{

 static serverURL =`http://localhost:8080/api`;

 static getAllStudent(){
  let dataURL = `${this.serverURL}/student/all`;
  return axios.get(dataURL);
 }
 static getStudent(studentId){
  let dataURL = `${this.serverURL}/student/get/${studentId}`
  return axios.get(dataURL);
 }
 static createStudent(student){
  let dataURL = `${this.serverURL}/student/save`;
  return axios.post(dataURL, student)
 }

 static deleteStudent(studentId){
  let dataURL = `${this.serverURL}/student/delete/${studentId}`;
  return axios.delete(dataURL);
 }

 static updateStudent(student){
  let dataURL = `${this.serverURL}/student/update`;
  return axios.put(dataURL,student);
 }
 
}
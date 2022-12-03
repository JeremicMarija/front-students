import axios from "axios"

export class StudentService{

 static serverURL =`http://localhost:8080/api`;

 static getAllStudent(){
  let dataURL = `${this.serverURL}/student/all`;
  return axios.get(dataURL);
 }
 
}
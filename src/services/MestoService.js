import axios from "axios";

export class MestoService{
 static serverURL =`http://localhost:8080/api`;

 static getAllMesta(){
  let dataURL = `${this.serverURL}/mesto/all`;
  return axios.get(dataURL);
 }

 static getMesto(mestoId){
  let dataURL = `${this.serverURL}/mesto/get/${mestoId}`;
  return axios.get(dataURL);
 }

}
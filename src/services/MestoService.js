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

 static createMesto(mesto){
  let dataURL = `${this.serverURL}/mesto/save`;
  return axios.post(dataURL, mesto);
 }

 static updateMesto(mesto,mestoId){
  let dataURL = `${this.serverURL}/mesto/update/${mestoId}`;
  return axios.put(dataURL, mesto);
 }

 static deleteMesto(mestoId){
  let dataURL = `${this.serverURL}/mesto/delete/${mestoId}`;
  return axios.delete(dataURL);
 }

}
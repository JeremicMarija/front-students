import axios from "axios"

export class FakultetService{

 static serverURL =`http://localhost:8080/api`;

 static getAllFakultet(){
  let dataURL = `${this.serverURL}/fakultet/all`;
  return axios.get(dataURL);
 }

 static getFakultet(fakultetId){
  let dataURL = `${this.serverURL}/fakultet/get/${fakultetId}`
  return axios.get(dataURL);
 }

 static createFakultet(fakultet){
  let dataURL = `${this.serverURL}/fakultet/save`;
  return axios.post(dataURL,fakultet);
 }

 static updateFakultet(fakultet){
  let dataURL = `${this.serverURL}/fakultet/update`
  return axios.put(dataURL, fakultet)
 }

 static deleteFakultet(fakultetId){
  let dataURL = `${this.serverURL}/fakultet/delete/${fakultetId}`;
  return axios.delete(dataURL);
 }

}
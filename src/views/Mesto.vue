<template>
 <div class="container mt-4">
  <div class="row">
   <div class="col">
    <p class="h3 text-success fw-bold">Mesto
     <router-link to="/mesto/add" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Dodaj novo mesto</router-link>
    </p>
    <!-- Spinner -->
    <div v-if="loading">
     <div class="container">
      <div class="row">
       <div class="col">
        <Spinner/>
       </div>
      </div>
     </div>
    </div>

    <!-- Error Message -->
    <div v-if="!loading && errorMessage">
     <div class="conatiner mt-3">
      <div class="row">
       <div class="col">
        <p class="h4 text-danger fw-bold">{{errorMessage}}</p>
       </div>
      </div>
     </div>
    </div>
    <table class="table table-hover text-center table-striped shadow-lg mt-5">
     <thead class="bg-success text-white">
      <tr>
       <th>Ptt</th>
       <th>Naziv</th>
       <th>Broj stanovnika</th>
       <th>Akcija</th>
      </tr>
     </thead>
     <tbody>
      <tr v-for="mesto of mestoArr" :key="mesto">
       <td>{{mesto.ptt}}</td>
       <td>{{mesto.naziv}}</td>
       <td>{{mesto.brojStanovnika}}</td>
       <td>
        <router-link :to="`/mesto/update/${mesto.ptt}`" class="btn btn-success btn-sm">Izmeni</router-link>
        <button @click="deleteMesto(mesto.ptt)" class="btn btn-danger btn-sm mx-2">Obriši</button>
        </td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>
 </div>
</template>

<script>
import {MestoService} from '@/services/MestoService';
import Spinner from '@/components/Spinner.vue'
export default{
 name: "Mesto",
 components: {
  Spinner,
 },
 data: function(){
  return{
    loading: false,
    mestoArr: [],
    errorMessage: null,
    ptt: '',
    naziv: '',
    brojStanovnika: ''
  }
 },
 created: async function(){
  try{
    this.loading = true;
    let response = await MestoService.getAllMesta();
    this.mestoArr = response.data;
    this.loading = false;
  }catch (error){
    this.errorMessage = error;
    this.loading = false;
  }
 },
 methods:{
  deleteMesto: async function(mestoId){
    try {
      this.loading = true;
      let response = await MestoService.deleteMesto(mestoId);
      if(response){
        let deleteResponse = await MestoService.getAllMesta();
        this.mestoArr = deleteResponse.data;
        this.loading = false;
      }
    } catch (error) {
        this.errorMessage = error;
        this.loading = false;
    }
  }
 }
}
</script>

<style>

</style>
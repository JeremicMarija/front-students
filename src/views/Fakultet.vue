<template>
 <div class="container mt-4">
  <div class="row">
   <div class="col">
    <p class="h3 text-success fw-bold">Fakultet
     <router-link to="/fakultet/add" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Dodaj novi fakultet</router-link>
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
       <th>Matični broj</th>
       <th>Naziv</th>
       <th>Mesto</th>
       <th>Akcija</th>
      </tr>
     </thead>
     <tbody>
      <tr v-for="fakultet of fakultetArr" :key="fakultet">
       <td>{{fakultet.maticniBroj}}</td>
       <td>{{fakultet.naziv}}</td>
       <td>{{fakultet.mesto.naziv}}</td>
       <td>
        <router-link :to="`/fakultet/update/${fakultet.maticniBroj}`" class="btn btn-success btn-sm edit">Izmeni</router-link>
        <button @click="deleteFakultet(fakultet.maticniBroj)" class="btn btn-danger btn-sm mx-2">Obriši</button>
        </td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>
 </div>
</template>

<script>
 import Spinner from '@/components/Spinner.vue'
 import {FakultetService} from '@/services/FakultetService';

 export default{
  name: "Fakultet",
  components: {
   Spinner,
  },
  data: function(){
   return{
    loading: false,
    fakultetArr: [],
    errorMessage: null,
   }
  },
  created: async function(){
   try {
    this.loading = true;
    let response = await FakultetService.getAllFakultet();
    this.fakultetArr = response.data;
    this.loading = false;
   } catch (error) {
    this.errorMessage = error;
    this.loading = false;
   }
  },
  methods:{
   deleteFakultet: async function(fakultetId){
    try {
     this.loading = true;
     let response = await FakultetService.deleteFakultet(fakultetId);
     if(response){
      let deleteResponse = await FakultetService.getAllFakultet();
      this.fakultetArr = deleteResponse.data;
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
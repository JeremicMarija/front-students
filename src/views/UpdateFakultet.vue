<template>
 <div class="container mt-3">
  <div class="row">
   <div class="col">
    <p class="h3 text-success fw-bold">Izmeni Fakultet</p>
   </div>
  </div>
 </div>

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

 <div class="container mt-3">
  <div class="row">
   <div class="col-md-4">
    <form action="" @submit.prevent="fakultetUpdate()">
     <div class="mb-2">
      <input v-model="fakultet.maticniBroj" type="text" class="form-control" placeholder="Matični Broj">
     </div>
     <div class="mb-2">
      <input v-model="fakultet.naziv" type="text" class="form-control" placeholder="Naziv">
     </div>
     <div class="mb-2">
      <!-- <select name="" id="" :disabled = "isDisabled" ref="selectMesto" v-model="fakultet.mestoId" class="form-control" v-if="mestoArr.length > 0">
       <option :value="mesto.ptt" v-for="mesto of mestoArr" :key="mesto.ptt">{{mesto.naziv}}</option>
      </select> -->
      <input disabled :value="mesto.naziv" type="text" class="form-control">
     </div>
     <div class="mt-3">
      <input type="submit" class="btn btn-success text-white" value="Izmeni">
     </div>
    </form>
   </div>
  </div>
  <div class="row mt-3">
   <div class="col-md-4 back-btn">
    <router-link to="/fakultet" class="btn btn-success btn-sm"><i class="fa fa-arrow-alt-circle-left"></i> Nazad</router-link>
   </div>
  </div>
 </div>

 <pre>{{fakultet}}</pre>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import {FakultetService} from '@/services/FakultetService'
import {MestoService} from '@/services/MestoService'

export default{
 name: "UpdateFakultet",
 components: {
  Spinner,
 },
 data: function(){
  return{
   fakultetId: this.$route.params.fakultetId,
   loading: false,
   fakultet:{
    maticniBroj: '',
    naziv: '',
    mestoId: '',
   },
   errorMessage: null,
   mesto:{
    ptt:'',
    naziv:'',
    brojStanovnika: '',
   },
  }
 },
 created: async function(){
  try {
   this.loading = true;
   let response = await FakultetService.getFakultet(this.fakultetId);
   this.fakultet = response.data;
   // console.log(response.data);
   let mestoResponse = await MestoService.getMesto(response.data.mesto.ptt);
   // console.log(mestoResponse.data);
   this.mesto = mestoResponse.data;
   this.loading = false;
  } catch (error) {
     this.errorMessage = error;
     this.loading = false;
  }
 },
 methods: {
  fakultetUpdate: async function(){
   try {
    let response = await FakultetService.updateFakultet(this.fakultet, this.fakultetId);
    if(response){
     return this.$router.push('/fakultet');
    }else{
     return this.$router.push(`/fakultet/update/${this.fakultetId}`)
    }
   } catch (error) {
    console.log(error)
   }
  }
 }
}
</script>
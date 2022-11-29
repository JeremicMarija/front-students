<template>
 <div class="container mt-3">
  <div class="row">
   <div class="col">
    <p class="h3 text-success fw-bold">Izmeni Mesto</p>
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

 <div class="container mt-3" v-if="!loading && isDone()">
  <div class="row">
   <div class="col-md-4">
    <form action="" @submit.prevent="updateMesto()">
     <div class="mb-2">
      <input v-model="mesto.ptt" type="text" class="form-control" placeholder="Ptt">
     </div>
     <div class="mb-2">
      <input v-model="mesto.naziv" type="text" class="form-control" placeholder="Naziv">
     </div>
     <div class="mb-2">
      <input v-model="mesto.brojStanovnika" type="text" class="form-control" placeholder="Broj stanovnika">
     </div>
     <div class="mt-3">
      <input type="submit" class="btn btn-success text-white" value="Izmeni">
     </div>
    </form>
   </div>
  </div>
  <div class="row mt-3">
   <div class="col-md-4 back-btn">
    <router-link to="/mesto" class="btn btn-success btn-sm"><i class="fa fa-arrow-alt-circle-left"></i> Nazad</router-link>
   </div>
  </div>
 </div>
</template>

<script>
import {MestoService} from '@/services/MestoService';
import Spinner from '@/components/Spinner.vue'
export default{
 name: "UpdateMesto",
 components: {
  Spinner
 },
 data: function(){
  return{
   mestoId: this.$route.params.mestoId,
   loading: false,
   mesto:{
    ptt: '',
    naziv: '',
    brojStanovnika: ''
   },
   errorMessage: null,
  }
 },
 created: async function(){
  try{
   this.loading = true;
   let response = await MestoService.getMesto(this.mestoId);
   this.mesto = response.data;
   this.loading = false;
  }catch(error){
    this.errorMessage = error;
    this.loading = false;
  }
 },
 methods: {
  isDone: function(){
   return Object.keys(this.mesto).length > 0;
  },
  updateMesto: async function(){
   try {
    let response = await MestoService.updateMesto(this.mesto,this.mestoId);
    if(response){
     return this.$router.push('/mesto');
    }else{
     return this.$router.push(`/mesto/update/${this.mestoId}`)
    }
   } catch (error) {
    console.log(error);
   }
  }
 }
}
</script>
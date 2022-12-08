<template>
 <div class="container mt-3">
  <div class="row">
   <div class="col">
    <p class="h3 text-success fw-bold">Dodaj Mesto</p>
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
    <form action="" @submit.prevent="mestoCreate()">
     <div class="mb-2">
      <input v-model="mesto.ptt" type="text" class="form-control" placeholder="Ptt">
     </div>
     <div class="mb-2">
      <input v-model="mesto.naziv" type="text" class="form-control" placeholder="Naziv" pattern="^[A-Z]+[a-zA-Zs]{2,35}$">
     </div>
     <div class="mb-2">
      <input v-model="mesto.brojStanovnika" type="text" class="form-control" placeholder="Broj stanovnika">
     </div>
     <div class="mt-3">
      <input type="submit" class="btn btn-success text-white" value="Dodaj">
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

 <pre>{{mesto}}</pre>
</template>

<script>
import {MestoService} from '@/services/MestoService';
import Spinner from '@/components/Spinner.vue'
export default{
 name: "AddMesto",
 components: {
  Spinner
 },
 data: function(){
  return{
   mesto:{
    ptt: '',
    naziv: '',
    brojStanovnika: ''
   }
  }
 },
 methods: {
  mestoCreate: async function(){
   try{
    let response = await MestoService.createMesto(this.mesto);
    if(response){
     return this.$router.push('/mesto');
    }else{
     return this.$router.push('/mesto/add')
    }
   }catch(error){
    console.log(error);
   }
  }
 }
}

</script>

<style scoped>

.form-control::-webkit-input-placeholder {
 color: #198754;
 opacity: 0.8;
 
}
.form-control{
 color: #198754;
 /* opacity: 0.6; */
}
</style>
<template>
 <div class="container mt-3">
  <div class="row">
   <div class="col">
    <p class="h3 text-success fw-bold">Dodaj Fakultet</p>
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
    <form action="" @submit.prevent="fakultetCreate()">
     <div class="mb-2">
      <input v-model="fakultet.maticniBroj" type="text" class="form-control" placeholder="Matični Broj">
     </div>
     <div class="mb-2">
      <input v-model="fakultet.naziv" type="text" class="form-control" placeholder="Naziv">
     </div>
     <div class="mb-2">
      <select name="" id="" :disabled = "isDisabled" ref="selectMesto" v-model="fakultet.mestoId" class="form-control addOpacity" v-if="mestoArr.length > 0">
       <option value=""  selected disabled >Izaberi mesto</option>
       <option :value="mesto.ptt" v-for="mesto of mestoArr" :key="mesto.ptt">{{mesto.naziv}}</option>
      </select>
     </div>
     <div class="mt-3">
      <input type="submit" class="btn btn-success text-white" value="Dodaj">
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
 name: "AddFakultet",
 components: {
  Spinner,
 },
 data: function(){
  const fMestoId = this.$route.params.mestoId || '';
  return{
   mestoId: this.$route.params.mestoId,
   fakultet: {
    maticniBroj: '',
    naziv: '',
    mestoId: fMestoId,
   },
   mestoArr: [],
  }
 },
 computed: {
  isDisabled: function(){
   return this.$route.params.mestoId ? true : false;
  }
 },
 created: async function(){
  try {
   let response = await MestoService.getAllMesta();
   this.mestoArr = response.data;
  } catch (error) {
     this.errorMessage = error;
     this.loading = false;
  }
 },
 methods: {
  fakultetCreate: async function(){
   try {
    let response = await FakultetService.createFakultet(this.fakultet);
    if(response){
     return this.$router.push('/fakultet');
    }else{
     return this.$router.push('/fakultet/add');
    }
   } catch (error) {
    console.log(error);
   }
  }
 }

}
</script>

<style scoped>
select,
select option {
  color: #000000;
}

select:invalid,
select option[value=""] {
  color: #999999;
}

</style>
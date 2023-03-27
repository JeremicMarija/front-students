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
      <span v-if="v$.fakultet.maticniBroj.$error">{{v$.fakultet.maticniBroj.$errors[0].$message}}</span>
     </div>
     <div class="mb-2">
      <input v-model="fakultet.naziv" type="text" class="form-control" placeholder="Naziv">
      <span v-if="v$.fakultet.naziv.$error">{{v$.fakultet.naziv.$errors[0].$message}}</span>
     </div>
     <div class="mb-2">
      <select name="" id="" ref="selectMesto" v-model="fakultet.mestoId" class="form-control" v-if="mestoArr.length > 0">
         <option :value="mesto.ptt" v-for="mesto of mestoArr" :key="mesto.ptt">{{mesto.naziv}}</option>
      </select>
      <span v-if="v$.fakultet.mestoId.$error">{{v$.fakultet.mestoId.$errors[0].$message}}</span>
      <!-- <input disabled :value="mesto.naziv" type="text" class="form-control"> -->
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
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, numeric, helpers} from '@vuelidate/validators'

const nameregex = helpers.regex(/^[A-Z][a-zA-Z\s]*$/);

export default{
 name: "UpdateFakultet",
 components: {
  Spinner,
 },
 setup: () => ({ v$: useVuelidate() }),
 data: function(){
   const fMestoId = this.$route.params.mestoId || '';
  return{
   fakultetId: this.$route.params.fakultetId,
   loading: false,
   fakultet:{
    maticniBroj: '',
    naziv: '',
    mestoId: fMestoId,
   },
   errorMessage: null,
   mestoArr:[],
  }
 },
 validations (){
   return{
      fakultet: {
        maticniBroj: {
          required: helpers.withMessage('Polje ne moze biti prazno', required),
          numeric: helpers.withMessage('Polje moze sadrzati samo cifre', numeric),
          maxLength: helpers.withMessage('Polje mora imati 8 cifara', maxLength(8)),
          minLength: helpers.withMessage('Polje mora imati 8 cifara', minLength(8))
          },
        naziv: {
          required: helpers.withMessage('Polje ne moze biti prazno', required),
          nameregex: helpers.withMessage('Polje mora pocinjati velikim slovom', nameregex),
          maxLength: helpers.withMessage('Polje mora imati maksimum 35 karaktera', maxLength(35)),
          minLength: helpers.withMessage('Polje mora imati minimum 2 karaktera', minLength(2))
        },
        mestoId: {
          required: helpers.withMessage('Polje ne moze biti prazno', required)
        },
      },
   }
 },
 created: async function(){
  try {
   this.loading = true;
   let response = await FakultetService.getFakultet(this.fakultetId);
   this.fakultet = response.data;
   // console.log(response.data);
   let mestoResponse = await MestoService.getMesto(this.fakultet.mestoId);
   console.log(mestoResponse.data);
   // this.mesto = mestoResponse.data;
   let responseMestoAll = await MestoService.getAllMesta();
   // console.log(responseMestoAll);
   this.mestoArr = responseMestoAll.data;
   this.loading = false;
  } catch (error) {
     this.errorMessage = error;
     this.loading = false;
  }
 },
 methods: {
  fakultetUpdate: async function(){
   this.v$.$validate();
   if(!this.v$.$error){
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
}
</script>
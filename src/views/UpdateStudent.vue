<template>
  <div class="container mt-3">
   <div class="row">
    <div class="col">
     <p class="h3 text-success fw-bold">Izmeni Studenta</p>
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
    <form action="" @submit.prevent="studentUpdate()">
     <div class="mb-2">
      <input v-model="student.brojIndeksa" type="text" class="form-control inputBrojIndeksa" placeholder="Broj indeksa">
      <span class="errorBrojIndeksa" v-if="v$.student.brojIndeksa.$error">{{v$.student.brojIndeksa.$errors[0].$message}}</span>
     </div>
     <div class="mb-2">
      <input v-model="student.ime" type="text" class="form-control inputIme" placeholder="Ime">
      <span class="errorIme" v-if="v$.student.ime.$error">{{v$.student.ime.$errors[0].$message}}</span>
     </div>
     <div class="mb-2">
      <input v-model="student.prezime" type="text" class="form-control inputPrezime" placeholder="Prezime">
      <span class="errorPrezime" v-if="v$.student.prezime.$error">{{v$.student.prezime.$errors[0].$message}}</span>
     </div>
     <div class="mb-2">
      <input v-model="student.datumRodjenja" type="date" class="form-control inputDatumRodjenja" placeholder="Datum rodjenja">
      <span class="errorDatumRodjenja" v-if="v$.student.datumRodjenja.$error">{{v$.student.datumRodjenja.$errors[0].$message}}</span>
     </div>
     <div class="mb-2">
      <input v-model="student.jmbg" type="text" class="form-control inputJMBG" placeholder="JMBG">
      <span class="errorJMBG" v-if="v$.student.jmbg.$error">{{v$.student.jmbg.$errors[0].$message}}</span>
     </div>
     <div class="mb-2">
      <VueMultiselect
        v-model="fakultetFullIds"
        label="naziv" 
        track-by="maticniBroj" 
        :multiple="true" 
        placeholder="Izaberite fakultet"
        :options="fakultetArr"
        @select="onSelect"
        :clearable="false"
        :hideSelected = "true">
      </VueMultiselect>
      <span v-if="v$.fakultetFullIds.$error">{{v$.fakultetFullIds.$errors[0].$message}}</span>
     </div>
     <div class="mt-3">
      <input type="submit" class="btn btn-success text-white" value="Izmeni">
     </div>
    </form>
   </div>
  </div>
  <div class="row mt-3">
   <div class="col-md-4 back-btn">
    <router-link to="/student" class="btn btn-success btn-sm"><i class="fa fa-arrow-alt-circle-left"></i> Nazad</router-link>
   </div>  
  </div>
 </div>
 
</template>

<script>

import Spinner from '@/components/Spinner.vue'
import VueMultiselect from "vue-multiselect"
import {StudentService} from '@/services/StudentService'
import {FakultetService} from '@/services/FakultetService'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, numeric, helpers} from '@vuelidate/validators'

const nameregex = helpers.regex(/^[A-Z][a-zA-Z\s]*$/);
const indexnumregex = helpers.regex(/^[0-9]{2}[/]{1}[0-9]{1,4}$/);

export default{
 name: "UpdateStudent",
  components: {
  Spinner,
  VueMultiselect
 },
 setup: () => ({ v$: useVuelidate() }),
 data: function(){
  return{
   studentId: this.$route.params.studentId,
   loading: false,
   student:{
     brojIndeksa: '',
     ime: '',
     prezime:'',
     datumRodjenja: '',
     jmbg: '',
     fakultetIds: [],
   },
     errorMessage: null,
     fakultetArr:[],
     selectedIds:[],
     fakultetFullIds: []
  }
 },
 validations (){
  return{
    student:{
      brojIndeksa: {
          required: helpers.withMessage('Polje ne moze biti prazno', required),
          indexnumregex: helpers.withMessage('Broj indeksa mora biti u formatu 21/3720, prve dve cifre za godinu i maksimalno 4 cifre za redni broj',indexnumregex)
        },
      ime: {
          required: helpers.withMessage('Polje ne moze biti prazno', required),
          nameregex: helpers.withMessage('Polje mora pocinjati velikim slovom', nameregex),
          maxLength: helpers.withMessage('Polje mora imati maksimum 35 karaktera', maxLength(35)),
          minLength: helpers.withMessage('Polje mora imati minimum 2 karaktera', minLength(2))
        },
      prezime:{
          required: helpers.withMessage('Polje ne moze biti prazno', required),
          nameregex: helpers.withMessage('Polje mora pocinjati velikim slovom', nameregex),
          maxLength: helpers.withMessage('Polje mora imati maksimum 35 karaktera', maxLength(35)),
          minLength: helpers.withMessage('Polje mora imati minimum 2 karaktera', minLength(2))
        },
      datumRodjenja: {
          required: helpers.withMessage('Polje ne moze biti prazno', required),
        },
      jmbg: {
          required: helpers.withMessage('Polje ne moze biti prazno', required),
          numeric: helpers.withMessage('Polje moze sadrzati samo cifre', numeric),
          maxLength: helpers.withMessage('Polje mora imati 13 cifara', maxLength(13)),
          minLength: helpers.withMessage('Polje mora imati 13 cifara', minLength(13))
        },
      fakultetIds: {
          required: helpers.withMessage('Polje ne moze biti prazno', required),
        }
   },
   fakultetFullIds: {
      required: helpers.withMessage('Polje ne moze biti prazno', required),
    }
  }
 },
 created: async function(){
  try{
   this.loading = true;
   let response = await StudentService.getStudent(this.studentId);
   this.student = response.data;
   // console.log(response.data);
   let responseFakulteti = await FakultetService.getAllFakultet();
   console.log(responseFakulteti.data);
   for(let i = 0; i<responseFakulteti.data.length; i++){
    if(this.student.fakultetIds.includes(responseFakulteti.data[i].maticniBroj)){
      this.fakultetFullIds.push(responseFakulteti.data[i]);
    }
     this.fakultetArr.push(responseFakulteti.data[i]);
   }
   this.loading = false;
  }catch (error){
    this.errorMessage = error;
    this.loading = false;
  }
 },
 methods:{
  studentUpdate: async function(){
   let studentApi = {    
    ...this.student,
    fakultetIds: this.selectedIds
   }
   this.v$.$validate();
   if(!this.v$.$error){
    try {
      let response = await StudentService.updateStudent(studentApi, this.studentId);
      if(response){
        return this.$router.push('/student');
      }else{
        return this.$router.push(`/student/update/${this.studentId}`)
      }
    } catch (error) {
      console.log(error)
    }
   }
  },
  onSelect(option){
      this.selectedIds.push(option.maticniBroj);
  }
 }
}

</script>

<style>
 .multiselect__tag-icon {
  display: none;
 }
</style>
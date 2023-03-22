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
      <input v-model="student.brojIndeksa" type="text" class="form-control" placeholder="Broj indeksa">
     </div>
     <div class="mb-2">
      <input v-model="student.ime" type="text" class="form-control" placeholder="Ime">
     </div>
     <div class="mb-2">
      <input v-model="student.prezime" type="text" class="form-control" placeholder="Prezime">
     </div>
     <div class="mb-2">
      <input v-model="student.datumRodjenja" type="date" class="form-control" placeholder="Datum rodjenja">
     </div>
     <div class="mb-2">
      <input v-model="student.jmbg" type="text" class="form-control" placeholder="JMBG">
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

export default{
 name: "UpdateStudent",
  components: {
  Spinner,
  VueMultiselect
 },
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
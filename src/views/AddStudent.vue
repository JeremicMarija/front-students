<template>
 <div class="container mt-3">
  <div class="row">
   <div class="col">
    <p class="h3 text-success fw-bold">Dodaj Studenta</p>
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
    <form action="" @submit.prevent="studentCreate()">
     <div class="mb-2">
      <input v-model="student.brojIndeksa" type="text" class="form-control" placeholder="Broj indeksa">
      <span v-if="v$.student.brojIndeksa.$error">{{v$.student.brojIndeksa.$errors[0].$message}}</span>
     </div>
     <div class="mb-2">
      <input v-model="student.ime" type="text" class="form-control" placeholder="Ime">
      <span v-if="v$.student.ime.$error">{{v$.student.ime.$errors[0].$message}}</span>
     </div>
     <div class="mb-2">
      <input v-model="student.prezime" type="text" class="form-control" placeholder="Prezime">
      <span v-if="v$.student.prezime.$error">{{v$.student.prezime.$errors[0].$message}}</span>
     </div>
     <div class="mb-2">
      <input v-model="student.datumRodjenja" type="date" class="form-control" placeholder="Datum rodjenja">
      <span v-if="v$.student.datumRodjenja.$error">{{v$.student.datumRodjenja.$errors[0].$message}}</span>
     </div>
     <div class="mb-2">
      <input v-model="student.jmbg" type="text" class="form-control" placeholder="JMBG">
      <span v-if="v$.student.jmbg.$error">{{v$.student.jmbg.$errors[0].$message}}</span>
     </div>
     <div class="mb-2">
      <VueMultiselect
        v-model="student.fakultetIds"
        label="naziv" 
        track-by="maticniBroj" 
        :multiple="true" 
        placeholder="Izaberite fakultet"
        :options="fakultetArr"
        @select="onSelect">
      </VueMultiselect>
      <span v-if="v$.student.fakultetIds.$error">{{v$.student.fakultetIds.$errors[0].$message}}</span>
     </div>
     <div class="mt-3">
      <input type="submit" class="btn btn-success text-white" value="Dodaj">
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
 <!-- {{student}} -->
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
  name: 'AddStudent',
  components: {
    Spinner,
    VueMultiselect
  },
  setup: () => ({ v$: useVuelidate() }),
  data: function(){
    return{
      student:{
        brojIndeksa: '',
        ime: '',
        prezime:'',
        datumRodjenja: '',
        jmbg: '',
        fakultetIds: []
        },
      errorMessage: null,
      fakultetArr:[],
      selectedIds:[],
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
          numeric: helpers.withMessage('Polje mora biti cifra', numeric),
          maxLength: helpers.withMessage('Polje mora imati 13 cifara', maxLength(13)),
          minLength: helpers.withMessage('Polje mora imati 13 cifara', minLength(13))
        },
        fakultetIds: {
          required: helpers.withMessage('Polje ne moze biti prazno', required),
        }
      },
    }
  },
  created: async function(){
    try {
      let response = await FakultetService.getAllFakultet();
      for(let i = 0; i<response.data.length; i++){
        this.fakultetArr.push(response.data[i]);
      }
    } catch (error) {
      this.errorMessage = error;
      this.loading = false;
    }
  },
  methods:{
    studentCreate: async function(){
      let studentApi = {    
        ...this.student,
        fakultetIds: this.selectedIds
      }
      this.v$.$validate();
       if(!this.v$.$error){
          try {
            let response = await StudentService.createStudent(studentApi);
            if(response){
              return this.$router.push('/student');
            }else{
              return this.$router.push('/student/add');
            }
          } catch (error) {
            console.log(error);
          }
       }

    },
    onSelect(option){
      this.selectedIds.push(option.maticniBroj);
    }
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

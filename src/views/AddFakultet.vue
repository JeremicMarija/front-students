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
      <span v-if="v$.fakultet.maticniBroj.$error">{{v$.fakultet.maticniBroj.$errors[0].$message}}</span>
     </div>
     <div class="mb-2">
      <input v-model="fakultet.naziv" type="text" class="form-control" placeholder="Naziv">
      <span v-if="v$.fakultet.naziv.$error">{{v$.fakultet.naziv.$errors[0].$message}}</span>
     </div>
     <div class="mb-2">
      <select name="" id="" :disabled = "isDisabled" ref="selectMesto" v-model="fakultet.mestoId" class="form-control addOpacity" v-if="mestoArr.length > 0">
       <option value=""  selected disabled >Izaberi mesto</option>
       <option :value="mesto.ptt" v-for="mesto of mestoArr" :key="mesto.ptt">{{mesto.naziv}}</option>
      </select>
       <span v-if="v$.fakultet.mestoId.$error">{{v$.fakultet.mestoId.$errors[0].$message}}</span>
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
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, numeric, helpers} from '@vuelidate/validators'

const mestoregex = helpers.regex(/^[A-Z][a-zA-Z\s]*$/);
export default{
 name: "AddFakultet",
 components: {
  Spinner,
 },
 setup: () => ({ v$: useVuelidate() }),
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
  validations () {
    return {
      // mestoId: this.$route.params.mestoId,
      fakultet: {
        maticniBroj: {
          required: helpers.withMessage('Polje ne moze biti prazno', required),
          numeric: helpers.withMessage('Polje mora biti cifra', numeric),
          maxLength: helpers.withMessage('Polje mora imati 8 cifara', maxLength(8)),
          minLength: helpers.withMessage('Polje mora imati 8 cifara', minLength(8))
          },
        naziv: {
          required: helpers.withMessage('Polje ne moze biti prazno', required),
          mestoregex: helpers.withMessage('Polje mora pocinjati velikim slovom', mestoregex),
          maxLength: helpers.withMessage('Polje mora imati maksimum 35 karaktera', maxLength(35)),
          minLength: helpers.withMessage('Polje mora imati minimum 2 karaktera', minLength(2))
        },
        mestoId: {
          required: helpers.withMessage('Polje ne moze biti prazno', required)
        },
      },
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
    //  const isFormCorrect = await this.v$.$validate();
    this.v$.$validate();
     if(!this.v$.$error){
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
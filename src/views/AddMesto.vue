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
      <input v-model="mesto.ptt" type="text" class="form-control pttInput" placeholder="Ptt" >
      <span class="errorPtt" v-if="v$.mesto.ptt.$error">{{v$.mesto.ptt.$errors[0].$message}}</span>
     </div>
     <div class="mb-2">
      <input v-model="mesto.naziv" type="text" class="form-control nazivInput" placeholder="Naziv" >
      <span class="errorNaziv" v-if="v$.mesto.naziv.$error">{{v$.mesto.naziv.$errors[0].$message}}</span>
     </div>
     <div class="mb-2">
      <input v-model="mesto.brojStanovnika" type="text" class="form-control brojStanovnikaInput" placeholder="Broj stanovnika">
      <span class="errorBrojStanovnika" v-if="v$.mesto.brojStanovnika.$error">{{v$.mesto.brojStanovnika.$errors[0].$message}}</span>
     </div>
     <div class="mt-3">
      <input id="submit" type="submit" class="btn btn-success text-white" value="Dodaj">
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

 <!-- <pre>{{mesto}}</pre> -->
</template>

<script>
import {MestoService} from '@/services/MestoService';
import Spinner from '@/components/Spinner.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, numeric, minValue, helpers } from '@vuelidate/validators'

const nameregex = helpers.regex(/^[A-Z][a-zA-Z\s]*$/)
export default{
  name: "AddMesto",
  components: {
    Spinner
  },
  setup: () => ({ v$: useVuelidate() }),
  data: function(){
    return{
      mesto:{
        ptt: '',
        naziv: '',
        brojStanovnika: ''
      }
    }
  },
  validations (){
    return{
      mesto:{
        ptt: { 
          required: helpers.withMessage('Polje ne moze biti prazno', required),
          numeric: helpers.withMessage('Polje moze sadrzati samo cifre', numeric),
          maxLength: helpers.withMessage('Polje mora imati 5 cifara', maxLength(5)),
          minLength: helpers.withMessage('Polje mora imati 5 cifara', minLength(5))
        },
        naziv: { 
          required: helpers.withMessage('Polje ne moze biti prazno', required),
          nameregex: helpers.withMessage('Polje mora pocinjati velikim slovom', nameregex),
          maxLength: helpers.withMessage('Polje mora imati maksimum 35 karaktera', maxLength(35)),
          minLength: helpers.withMessage('Polje mora imati minimum 2 karaktera', minLength(2))
        },
        brojStanovnika: { 
          required: helpers.withMessage('Polje ne moze biti prazno', required),
          numeric: helpers.withMessage('Polje moze sadrzati samo cifre', numeric),
          minValue: helpers.withMessage('Polje mora biti vece od nule', minValue(1))
        },
      }
    }
  },
  methods: {
    mestoCreate: async function(){
      this.v$.$validate();
      if(!this.v$.$error){
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
}

</script>

<style scoped>

.form-control::-webkit-input-placeholder {
 color: #198754;
 opacity: 0.8;
 
}
.form-control{
 color: #198754;
}
</style>
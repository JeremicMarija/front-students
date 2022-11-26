<template>
 <div class="container mt-4">
  <div class="row">
   <div class="col">
    <p class="h3 text-success fw-bold">Mesto
     <router-link to="/mesto/add" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Dodaj novo mesto</router-link>
    </p>
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
    <table class="table table-hover text-center table-striped shadow-lg mt-5">
     <thead class="bg-success text-white">
      <tr>
       <th>Ptt</th>
       <th>Naziv</th>
       <th>Broj stanovnika</th>
       <th>Akcija</th>
      </tr>
     </thead>
     <tbody>
      <tr>
       <td>11000</td>
       <td>Beograd</td>
       <td>2000000</td>
       <td>
        <router-link to="/mesto/update/:mestoId" class="btn btn-success btn-sm">Izmeni</router-link>
        <button to="" class="btn btn-danger btn-sm mx-2">Obriši</button>
        </td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>
 </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
export default{
 name: "Mesto",
 components: {
  Spinner,
 }
}
</script>

<style>

</style>
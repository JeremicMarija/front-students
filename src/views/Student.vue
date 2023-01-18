<template>
 <div class="container mt-4">
  <div class="row">
   <div class="col">
    <p class="h3 text-success fw-bold">Student
     <router-link to="/student/add" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Dodaj novog studenta</router-link>
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
       <th>Broj indeksa</th>
       <th>Ime</th>
       <th>Prezime</th>
       <th>Datum rodjenja</th>
       <th>JMBG</th>
       <th>Starost</th>
       <th>Fakultet</th>
       <th>Akcija</th>
      </tr>
     </thead>
     <tbody>
      <tr v-for="student of studentArr" :key="student">
        <td>{{student.brojIndeksa}}</td>
        <td>{{student.ime}}</td>
        <td>{{student.prezime}}</td>
        <td>{{student.datumRodjenja}}</td>
        <td>{{student.jmbg}}</td>
        <td>{{student.starost}}</td>
        <td>
          <ul class="list-group list-group-flush">
            <li v-for="fakultet of student.fakulteti" :key="fakultet" class="list-group-item bg-transparent">{{fakultet.naziv}}</li>
          </ul>
        </td>
        <td>
          <router-link :to="`/student/update/${student.brojIndeksa}`" class="btn btn-success btn-sm">Izmeni</router-link>
          <button @click="deleteFakultet(student.brojIndeksa)" class="btn btn-danger btn-sm mx-2">Obriši</button>
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
import {StudentService} from '@/services/StudentService'

export default{
 name: "Student",
 components: {
  Spinner,
 },
 data: function(){
  return{
   loading: false,
   studentArr: [],
   errorMessage: null,
  }
 },
 created: async function(){
  try {
    this.loading = true;
    let response = await StudentService.getAllStudent();
    this.studentArr = response.data;
    this.loading = false;
  } catch (error) {
     this.errorMessage = error;
     this.loading = false;
  }
 },
 methods: {
  deleteFakultet: async function(studentId){
    studentId = studentId.replace("/", "-");
    try {
      this.loading = true;
      let response = await StudentService.deleteStudent(studentId);
      if(response){
        let deleteResponse = await StudentService.getAllStudent();
        this.studentArr = deleteResponse.data;
        this.loading = false;
      }
    } catch (error) {
        this.errorMessage = error;
        this.loading = false;
    }
  }
 }
}

</script>

<style scoped>
td{
 vertical-align: middle;
}
</style>
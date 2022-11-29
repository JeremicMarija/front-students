<template>
 <nav class="navbar navbar-dark bg-success navbar-expand-sm">
  <div class="container">
   <router-link to="/" class="navbar-brand"><i class="fa-solid fa-user-gear mx-2"></i>Evidencija Studenata </router-link>
    <div class="navbar navbar-expand-sm">
     <ul class="navbar-nav">
      <li class="nav-item">
       <router-link class="nav-link text-white px-4" to="/mesto">Mesto</router-link>
      </li>
      <li class="nav-item">
       <router-link class="nav-link text-white px-4" to="/fakultet">Fakultet</router-link>
      </li>
      <li class="nav-item">
       <router-link class="nav-link text-white px-4" to="/student">Student</router-link>
      </li>
     </ul>
   </div>
  </div>
  
 </nav>
</template>

<script>
export default{
 name: 'NavBar'
}
</script>
<style>

</style>
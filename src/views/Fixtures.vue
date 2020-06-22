<template>
  <div class="max-w-md px-3 py-8">
    <h2 class="text-2xl py-4 font-bold">All Fixtures</h2>
    <div
      v-for="i in 10"
      :key="i"
      class="flex bg-white justify-between p-2 my-3 rounded-md shadow-lg"
    >
      <div>
        <div class="font-bold flex inline justify-between">
          <img src="#" alt="Home club image" />
          Name vs Name
          <img src="#" alt="Away club image" />
        </div>
      </div>
      <div class="font-bold">Update | Delete</div>
    </div>
    <div
      class="sticky z-auto bg-teal-500 font-extrabold text-white inline bottom-0 p-6 rounded-full h-16 w-16 items-center justify-right m-5"
    >
      New
    </div>
  </div>
</template>

<script>
// import axios from "axios";

// @ is an alias to /src
</script>

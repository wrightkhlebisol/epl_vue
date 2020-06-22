<template>
  <div class="max-w-md px-3 py-8">
    <h2 class="text-2xl py-4 font-bold">All Teams</h2>
    <div
      v-for="i in allTeams"
      :key="i"
      class="flex bg-white justify-between p-2 my-3 rounded-md shadow-lg"
    >
      <div class="font-bold">Image</div>
      <div>
        <div class="font-bold">Name</div>
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit, ea
          corrupti.
        </div>
      </div>
      <div class="font-bold">Update | Delete</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      allTeams: [],
    };
  },
  methods: {
    getAllTeams() {
      axios
        .get("http://localhost:8000/api/teams")
        .then((teams) => this.allTeams.push(teams.data))
        .catch();
    },
  },
  mounted() {
    this.getAllTeams();
  },
};
</script>

<template>
  <div class="max-w-md px-3 py-8">
    <h2 class="text-2xl py-4 font-bold">All Teams</h2>
    <div
      v-for="team in allTeams"
      :key="team.id"
      class="flex bg-white align-center justify-between p-2 my-3 rounded-md shadow-lg"
    >
      <div class="font-bold align-self-center m-2 rounded-full">
        <img
          src="https://i.pravatar.cc/50?u="
          class="rounded-full"
          :alt="team.team_name"
        />
      </div>
      <div>
        <div class="font-bold">{{ team.team_name }}</div>
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit, ea
          corrupti.
        </div>
      </div>
      <div class="font-bold">
        <span @click="updateTeam(team.id)">Update</span> |
        <span @click="deleteTeam(team.team_name, team.id)">Delete</span>
      </div>
    </div>
    <div
      @click="createTeam"
      class="sticky float-right z-auto bg-teal-500 font-extrabold text-white inline bottom-0 p-6 rounded-full h-16 w-16 m-5"
    >
      New
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      allTeams: [],
      team_name: "",
      bearer:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU5MjgzNDc3OSwiZXhwIjoxNTkyODM4Mzc5LCJuYmYiOjE1OTI4MzQ3NzksImp0aSI6IkZ4c0luelk0UHhTUDF5bE8iLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.BM6IMJ_JCw6GA3ojfevh1R-yv4QNpt_D07iiY0TvL0s",
    };
  },
  methods: {
    createTeam() {
      axios
        .post(`http://localhost:8000/api/teams/`, {
          team_name: this.team_name,
          headers: {
            Authorization: this.bearer,
          },
        })
        .then((response) => console.log(response))
        .catch();
    },
    getAllTeams() {
      axios
        .get("http://localhost:8000/api/teams", {
          headers: {
            Authorization: this.bearer,
          },
        })
        .then((team) => {
          this.allTeams = team.data;
        })
        .catch();
    },
    updateTeam(id) {
      axios
        .put(`http://localhost:8000/api/teams/${id}`, {
          team_name: this.team_name,
          headers: {
            Authorization: this.bearer,
          },
        })
        .then((response) => {
          this.getAllTeams();
          console.log(response);
        })
        .catch();
    },
    deleteTeam(teamName, id) {
      if (confirm(`Are you sure you want to delete ${teamName}`)) {
        axios
          .delete(`http://localhost:8000/api/teams/${id}`, {
            headers: {
              Authorization: this.bearer,
            },
          })
          .then((response) => {
            this.getAllTeams();
            console.log(response);
          })
          .catch();
      }
    },
  },
  mounted() {
    this.getAllTeams();
  },
};
</script>

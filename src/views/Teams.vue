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
      @click="showModal"
      class="sticky float-right z-auto bg-teal-500 font-extrabold text-white inline bottom-0 p-6 rounded-full h-16 w-16 m-5 cursor-pointer shadow-lg"
    >
      +
    </div>
    <div
      class="h-screen absolute w-full top-0 left-0 bg-gray-500 bg-opacity-50"
      v-show="createTeamModalState"
    >
      <div class="w-full max-w-xs m-auto">
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10"
          @submit="createTeam"
        >
          <span
            class="bg-white shadow-md font-bold float-right rounded-full p-2 cursor-pointer            h-8 w-8"
            @click="createTeamModalToggle"
            >x</span
          >
          <h1 class="font-bold text-2xl mb-10">Create New Team</h1>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="teamname"
            >
              Team Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="teamname"
              v-model="team_name"
              type="text"
              placeholder="Enter team name"
            />
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="createTeam"
            >
              Create
            </button>
          </div>
        </form>
      </div>
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
      bearer: localStorage.getItem("bearer"),
      createTeamModalState: false,
    };
  },
  methods: {
    createTeamModalToggle() {
      this.createTeamModalState = !this.createTeamModalState;
    },
    showModal() {
      this.createTeamModalToggle();
    },
    createTeam() {
      axios
        .post(`http://localhost:8000/api/teams/`, {
          team_name: this.team_name,
          headers: {
            Authorization: this.bearer,
          },
        })
        .then((response) => {
          (this.team_name = ""), this.createTeamModalToggle();

          console.log(response);
        })
        .catch((e) => {
          console.log(e.message);
        });
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
        .catch((e) => {
          console.log(e);
        });
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
        .catch((e) => {
          console.log(e.message);
        });
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
          .catch((e) => {
            console.log(e.message);
          });
      }
    },
  },
  mounted() {
    this.getAllTeams();
  },
};
</script>

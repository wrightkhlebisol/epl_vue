<template>
  <div class="max-w-md px-3 py-8">
    <p class="text-red-600">{{requestStatus}}</p>
    <h2 class="text-2xl py-4 font-bold">All Teams</h2>
    <div
      v-for="team in allTeams"
      :key="team.id"
      class="flex bg-white align-center justify-between p-2 my-3 rounded-md shadow-lg"
    >
      <div class="font-bold align-self-center m-2 rounded-full">
        <!-- <img src="https://i.pravatar.cc/50?u=" class="rounded-full" :alt="team.team_name" /> -->
      </div>
      <div>
        <div class="font-bold">{{ team.team_name }}</div>
        <!-- <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit, ea
          corrupti.
        </div>-->
      </div>
      <div class="font-bold">
        <span @click="showUpdateModal(team.id)">🖋</span> |
        <span @click="deleteTeam(team.team_name, team.id)">🚮</span>
      </div>
    </div>
    <div
      @click="showModal"
      class="sticky float-right z-auto bg-teal-500 font-extrabold text-white inline bottom-0 p-6 rounded-full h-16 w-16 m-5 cursor-pointer shadow-lg"
    >+</div>

    <!-- CREATE TEAMS MODAL -->
    <div
      class="h-screen absolute w-full top-0 left-0 bg-gray-500 bg-opacity-50"
      v-show="createTeamModalState"
    >
      <div class="w-full max-w-xs m-auto">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10" @submit="createTeam">
          <p class="text-red-600">{{requestStatus}}</p>
          <span
            class="bg-white shadow-md font-bold float-right rounded-full p-2 cursor-pointer h-8 w-8"
            @click="createTeamModalToggle"
          >x</span>
          <h1 class="font-bold text-2xl mb-10">Create New Team</h1>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="teamname">Team Name</label>
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
            >Create</button>
          </div>
        </form>
      </div>
    </div>

    <!-- CREATE TEAMS MODAL END -->

    <!-- UPDATE TEAMS MODAL -->
    <div
      class="h-screen absolute w-full top-0 left-0 bg-gray-500 bg-opacity-50"
      v-show="updateTeamModalState"
    >
      <div class="w-full max-w-xs m-auto">
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10"
          @submit="updateTeam(team_id)"
        >
          <p class="text-red-600">{{requestStatus}}</p>
          <span
            class="bg-white shadow-md font-bold float-right rounded-full p-2 cursor-pointer h-8 w-8"
            @click="updateTeamModalToggle"
          >x</span>
          <h1 class="font-bold text-2xl mb-10">Update Team {{ team_name }}</h1>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="update_teamname"
            >Team Name</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="update_teamname"
              v-model="team_id"
              type="text"
              placeholder="Enter team name"
            />
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="updateTeam(team_id)"
            >Update</button>
          </div>
        </form>
      </div>
    </div>

    <!-- UPDATE TEAMS MODAL END -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      allTeams: [],
      team_name: "",
      team_id: 0,
      bearer: localStorage.getItem("bearer"),
      createTeamModalState: false,
      updateTeamModalState: false,
      //   url: "http://localhost:8000/api",
      url: "https://eplapi.herokuapp.com/api",
      requestStatus: ""
    };
  },
  methods: {
    createTeamModalToggle() {
      this.createTeamModalState = !this.createTeamModalState;
    },
    showModal() {
      this.createTeamModalToggle();
    },
    updateTeamModalToggle() {
      this.updateTeamModalState = !this.updateTeamModalState;
    },
    showUpdateModal(teamId) {
      this.team_id = teamId;
      this.getTeamById(teamId);
      this.updateTeamModalToggle();
    },
    getTeamById(id) {
      axios
        .get(`${this.url}/teams/${id}`, {
          headers: {
            Authorization: this.bearer
          }
        })
        .then(team => {
          this.team_name = team.data.team_name;
        })
        .catch(e => {
          console.log(e);
        });
    },
    createTeam() {
      axios
        .post(
          `${this.url}/teams`,
          { team_name: this.team_name },
          {
            headers: {
              Authorization: this.bearer
            }
          }
        )
        .then(response => {
          this.team_name = "";
          this.createTeamModalToggle();
          this.getAllTeams();
          this.requestStatus = response.data.message;
          console.log(response);
        })
        .catch(e => {
          console.log(e.message);
        });
    },
    getAllTeams() {
      axios
        .get(`${this.url}/teams`, {
          headers: {
            Authorization: this.bearer
          }
        })
        .then(team => {
          this.allTeams = team.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateTeam(id) {
      axios
        .put(
          `${this.url}/teams/${id}`,
          { team_name: this.team_name },
          {
            headers: {
              Authorization: this.bearer
            }
          }
        )
        .then(response => {
          this.getAllTeams();
          console.log(response);
        })
        .catch(e => {
          console.log(e.message);
        });
    },
    deleteTeam(teamName, id) {
      if (confirm(`Are you sure you want to delete ${teamName}`)) {
        axios
          .delete(`${this.url}/teams/${id}`, {
            headers: {
              Authorization: this.bearer
            }
          })
          .then(response => {
            this.getAllTeams();
            this.requestStatus = response.data.message;
            console.log(response);
          })
          .catch(e => {
            console.log(e.message);
          });
      }
    }
  },
  mounted() {
    this.getAllTeams();
  }
};
</script>

<template>
  <div class="max-w-md px-3 py-8">
    <p class="text-red-600">{{requestStatus}}</p>
    <h2 class="text-2xl py-4 font-bold">All Fixtures</h2>
    <div
      v-for="fixture in allFixtures"
      :key="fixture.id"
      class="flex bg-white justify-between align-items-center p-2 my-3 rounded-md shadow-lg"
    >
      <div>
        <div class="font-bold flex inline justify-around">
          <!-- <img
            src="https://placeimg.com/50/50/any"
            class="rounded-full w-1/3"
            alt="Home club image"
          />-->
          Team {{ fixture.away_team_id }} vs Team {{ fixture.home_team_id }}
          <!-- <img
            src="https://placeimg.com/50/50/any"
            class="rounded-full w-1/3"
            alt="Away club image"
          />-->
        </div>
      </div>
      <div class="font-bold">
        <span @click="updateFixture(fixture.id)">🖋</span> |
        <span @click="deleteFixture(fixture.away_team, fixture.id)">🚮</span>
      </div>
    </div>

    <div
      @click="showModal"
      class="sticky float-right z-auto bg-teal-500 font-extrabold text-white inline bottom-0 p-6 rounded-full h-16 w-16 m-5 cursor-pointer"
    >+</div>
    <div
      class="h-screen absolute w-full top-0 left-0 bg-gray-500 bg-opacity-50"
      v-show="createFixtureModalState"
    >
      <div class="w-full max-w-xs m-auto">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10" @submit="createFixture">
          <p class="text-red-600">{{requestStatus}}</p>
          <span
            class="bg-white shadow-md font-bold float-right rounded-full p-2 cursor-pointer h-8 w-8"
            @click="createFixtureModalToggle"
          >x</span>
          <h1 class="font-bold text-2xl mb-10">Create New Fixture</h1>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="hometeam">Home Team</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hometeam"
              v-model="home_team"
              type="text"
              placeholder="Pick A Team (Home)"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="awayteam">Away Team</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="awayteam"
              v-model="away_team"
              type="text"
              placeholder="Pick A Team (Away)"
            />
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="createFixture"
            >Create Fixture</button>
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
      allFixtures: [],
      bearer: localStorage.getItem("bearer"),
      createFixtureModalState: false,
      home_team: "",
      away_team: "",
      //   url: "http://localhost:8000/api",
      url: "https://eplapi.herokuapp.com/api",
      requestStatus: ""
    };
  },
  methods: {
    createFixtureModalToggle() {
      this.createFixtureModalState = !this.createFixtureModalState;
    },
    showModal() {
      this.createFixtureModalToggle();
    },
    getAllFixtures() {
      axios
        .get(`${this.url}`, {
          headers: {
            Authorization: this.bearer
          }
        })
        .then(fixture => {
          this.allFixtures = fixture.data;
        })
        .catch();
    },
    createFixture() {
      alert("Creating fixture");
      // this.requestStatus = response.data.message;
      //   axios
      //     .post(`http://localhost:8000/api/fixtures/`,
      //   { home_team_id: this.home_team_id,
      //   away_team_id: this.away_team_id
      //  }
      //  , {
      //       headers: {
      //         Authorization: this.bearer,
      //       },
      //     })
      //     .then((response) => console.log(response))
      //     .catch();
    },
    updateFixture(id) {
      axios
        .put(`${this.url}/fixtures/${id}`, {
          away_team: this.away_team,
          headers: {
            Authorization: this.bearer
          }
        })
        .then(response => {
          this.getAllFixtures();
          console.log(response);
        })
        .catch();
    },
    deleteFixture(fixtureName, id) {
      if (confirm(`Are you sure you want to delete fixture ${id}`)) {
        axios
          .delete(`${this.url}/fixtures/${id}`, {
            headers: {
              Authorization: this.bearer
            }
          })
          .then(response => {
            this.getAllFixtures();
            this.requestStatus = response.data.message;
            console.log(response);
          })
          .catch();
      }
    }
  },
  mounted() {
    this.getAllFixtures();
  }
};
</script>

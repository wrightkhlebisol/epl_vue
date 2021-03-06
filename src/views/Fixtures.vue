<template>
  <div class="max-w-md px-3 py-8">
    <p class="text-red-600">{{ requestFailure }}</p>
    <p class="text-green-600">{{ requestSuccess }}</p>
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
          {{ fixture.away_team_id }} vs {{ fixture.home_team_id }}
          <!-- <img
            src="https://placeimg.com/50/50/any"
            class="rounded-full w-1/3"
            alt="Away club image"
          />-->
        </div>
      </div>
      <div class="font-bold">
        <span @click="updateFixture(fixture.id)">🖋</span>
        |
        <span @click="deleteFixture(fixture.away_team, fixture.id)">🚮</span>
      </div>
    </div>

    <div
      @click="showModal"
      class="sticky float-right z-auto bg-teal-500 font-extrabold text-white inline bottom-0 p-6 rounded-full h-16 w-16 m-5 cursor-pointer"
    >
      +
    </div>
    <div
      class="h-screen absolute w-full top-0 left-0 bg-gray-500 bg-opacity-50"
      v-show="createFixtureModalState"
    >
      <div class="w-full max-w-xs m-auto">
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10"
          @submit="createFixture"
        >
          <p class="text-red-600">{{ requestFailure }}</p>
          <p class="text-green-600">{{ requestSuccess }}</p>
          <span
            class="bg-white shadow-md font-bold float-right rounded-full p-2 cursor-pointer h-8 w-8"
            @click="createFixtureModalToggle"
          >
            x
          </span>
          <h1 class="font-bold text-2xl mb-10">Create New Fixture</h1>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="hometeam"
            >
              Home Team
            </label>

            <select
              id="hometeam"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              v-model="home_team"
            >
              <option disabled value>Pick A Team</option>
              <option v-for="team in allTeams" :key="team.id" :value="team.id">
                {{ team.team_name }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="awayteam"
            >
              Away Team
            </label>
            <select
              id="awayteam"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              v-model="away_team"
            >
              <option disabled value>Pick A Team</option>
              <option v-for="team in allTeams" :key="team.id" :value="team.id">
                {{ team.team_name }}
              </option>
            </select>
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="createFixture"
            >
              Create Fixture
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      allFixtures: [],
      bearer: localStorage.getItem('bearer'),
      createFixtureModalState: false,
      home_team: '',
      away_team: '',
      allTeams: [],
      // url: 'http://localhost:8000/api',
      url: "https://eplapi.herokuapp.com/api",
      requestSuccess: '',
      requestFailure: '',
    }
  },
  methods: {
    createFixtureModalToggle() {
      this.createFixtureModalState = !this.createFixtureModalState
    },
    showModal() {
      this.getAllTeams()
      this.createFixtureModalToggle()
    },
    getAllTeams() {
      axios
        .get(`${this.url}/teams`, {
          headers: {
            Authorization: this.bearer,
          },
        })
        .then((team) => {
          this.allTeams = team.data
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getAllFixtures() {
      axios
        .get(`${this.url}`, {
          headers: {
            Authorization: this.bearer,
          },
        })
        .then((fixture) => {
          this.allFixtures = fixture.data
        })
        .catch((e) => {
          console.log(e.response)
          this.requestFailure = e.response.statusText
        })
    },
    createFixture() {
      // this.requestSuccess = response.data.message;
      axios
        .post(
          `${this.url}/fixtures`,
          {
            home_team_id: this.home_team,
            away_team_id: this.away_team,
          },
          {
            headers: {
              Authorization: this.bearer,
            },
          },
        )
        .then((response) => {
          console.log(response)
          this.home_team = ''
          this.away_team = ''
          this.createFixtureModalToggle()
          this.getAllFixtures()
          this.requestSuccess = response.data.message
          console.log(response)
        })
        .catch((e) => {
          console.log(e.response)
          this.requestFailure = e.response.statusText
        })
    },
    updateFixture(id) {
      axios
        .put(
          `${this.url}/fixtures/${id}`,
          {
            home_team_id: this.home_team,
            away_team_id: this.away_team,
          },
          {
            headers: {
              Authorization: this.bearer,
            },
          },
        )
        .then((response) => {
          this.getAllFixtures()
          console.log(response)
        })
        .catch((e) => {
          console.log(e.response)
          this.requestFailure = e.response.statusText
        })
    },
    deleteFixture(fixtureName, id) {
      if (confirm(`Are you sure you want to delete fixture ${id}`)) {
        axios
          .delete(`${this.url}/fixtures/${id}`, {
            headers: {
              Authorization: this.bearer,
            },
          })
          .then((response) => {
            this.getAllFixtures()
            this.requestSuccess = response.data.message
            console.log(response)
          })
          .catch((e) => {
            console.log(e.response)
            this.requestFailure = e.response.statusText
          })
      }
    },
  },
  mounted() {
    this.getAllFixtures()
  },
}
</script>

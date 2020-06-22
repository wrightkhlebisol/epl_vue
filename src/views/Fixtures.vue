<template>
  <div class="max-w-md px-3 py-8">
    <h2 class="text-2xl py-4 font-bold">All Fixtures</h2>
    <div
      v-for="fixture in allFixtures"
      :key="fixture.away_team_id"
      class="flex bg-white justify-between align-items-center p-2 my-3 rounded-md shadow-lg"
    >
      <div>
        <div class="font-bold flex inline justify-between">
          <img
            src="https://placeimg.com/50/50/any"
            class="rounded-full w-1/3"
            alt="Home club image"
          />
          Team {{ fixture.away_team_id }} vs Team {{ fixture.home_team_id }}
          <img
            src="https://placeimg.com/50/50/any"
            class="rounded-full w-1/3"
            alt="Away club image"
          />
        </div>
      </div>
      <div class="font-bold">
        <span @click="updateFixture(fixture.id)">Update</span> |
        <span @click="deleteFixture(fixture.team_name, fixture.id)"
          >Delete</span
        >
      </div>
    </div>
    <div
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
      allFixtures: [],
      bearer:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU5MjgzNDc3OSwiZXhwIjoxNTkyODM4Mzc5LCJuYmYiOjE1OTI4MzQ3NzksImp0aSI6IkZ4c0luelk0UHhTUDF5bE8iLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.BM6IMJ_JCw6GA3ojfevh1R-yv4QNpt_D07iiY0TvL0s",
    };
  },
  methods: {
    getAllFixtures() {
      axios
        .get("http://localhost:8000/api/", {
          headers: {
            Authorization: this.bearer,
          },
        })
        .then((fixture) => {
          this.allFixtures = fixture.data;
        })
        .catch();
    },
    createFixture() {
      axios
        .post(`http://localhost:8000/api/fixtures/`, {
          team_name: this.team_name,
          headers: {
            Authorization: this.bearer,
          },
        })
        .then((response) => console.log(response))
        .catch();
    },
    updateFixture(id) {
      axios
        .put(`http://localhost:8000/api/fixtures/${id}`, {
          team_name: this.team_name,
          headers: {
            Authorization: this.bearer,
          },
        })
        .then((response) => {
          this.getAllFixtures();
          console.log(response);
        })
        .catch();
    },
    deleteFixture(fixtureName, id) {
      if (confirm(`Are you sure you want to delete ${fixtureName}`)) {
        axios
          .delete(`http://localhost:8000/api/fixtures/${id}`, {
            headers: {
              Authorization: this.bearer,
            },
          })
          .then((response) => {
            this.getAllFixtures();
            console.log(response);
          })
          .catch();
      }
    },
  },
  mounted() {
    this.getAllFixtures();
  },
};
</script>

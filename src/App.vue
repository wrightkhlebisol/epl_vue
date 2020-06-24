<template>
  <div id="app" class="container mx-auto max-w-md bg-gray-300 h-screen relative">
    <header class="bg-gray-900 px-4 py-3 flex items-center shadow-lg shadow justify-between">
      <div>
        <img class="h-8" src="https://placeimg.com/30/30/tech" alt="app logo" />
      </div>

      <div>
        <div id="nav" class="text-gray-500 focus:text-white focus:outline-none">
          <router-link to="/">Teams</router-link>|
          <router-link to="/fixtures">Fixtures</router-link>|
          <span @click="showModal" v-if="loggedIn" class="auth cursor-pointer">Login</span>
          <span @click="showRegModal" v-else class="auth cursor-pointer">Register</span>
        </div>
      </div>
    </header>
    <router-view v-if="loggedIn" />
    <h1
      v-else
      class="font-extrabold inline shadow-md text-white w-full text-center align-self-center"
    >Register to begin</h1>
    <!-- LOGIN MODAL SECTION -->
    <div
      class="h-screen bg-opacity-50 absolute w-full top-0 left-0 bg-gray-500"
      v-show="loginModalState"
    >
      <div class="w-full max-w-xs m-auto">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10" @submit="login">
          <p class="text-green-600">{{requestSuccess}}</p>
          <span
            class="bg-white shadow-md font-bold float-right rounded-full p-2 cursor-pointer h-8 w-8"
            @click="loginModalToggle"
          >x</span>
          <h1 class="font-bold text-2xl mb-10">Login</h1>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              v-model="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
              id="password"
              v-model="password"
              type="password"
              placeholder="******************"
            />
            <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="login"
            >Sign In</button>
            <!-- <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>-->
          </div>
        </form>
      </div>
    </div>
    <!-- LOGIN MODAL SECTION END -->

    <!-- REGISTER MODAL SECTION -->
    <div
      class="h-screen bg-opacity-50 absolute w-full top-0 left-0 bg-gray-500"
      v-show="regModalState"
    >
      <div class="w-full max-w-xs m-auto">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10" @submit="login">
          <p class="text-green-600">{{requestSuccess}}</p>
          <span
            class="bg-white shadow-md font-bold float-right rounded-full p-2 cursor-pointer h-8 w-8"
            @click="regModalToggle"
          >x</span>
          <h1 class="font-bold text-2xl mb-10">Register</h1>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="reg_name">Name</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="reg_name"
              v-model="name"
              type="text"
              placeholder="Name"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="reg_email">Email</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="reg_email"
              v-model="email"
              type="email"
              placeholder="Email"
            />
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="reg_password">Password</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
              id="reg_password"
              v-model="password"
              type="password"
              placeholder="******************"
            />
            <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
          </div>

          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password_confirmation"
            >Password Confirmation</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
              id="password_confirmation"
              v-model="password_confirmation"
              type="password"
              placeholder="******************"
            />
            <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="register"
            >Sign In</button>
            <!-- <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>-->
          </div>
        </form>
      </div>
    </div>
    <!-- REGISTER MODAL END -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginModalState: false,
      regModalState: false,
      loggedIn: false,
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      //   url: "http://localhost:8000/api",
      url: "https://eplapi.herokuapp.com/api",
      requestSuccess: ""
    };
  },
  methods: {
    loginModalToggle() {
      this.email = "";
      this.password = "";
      this.loginModalState = !this.loginModalState;
    },
    regModalToggle() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.password_confirmation = "";
      this.regModalState = !this.regModalState;
    },
    showModal() {
      this.loginModalToggle();
    },
    showRegModal() {
      this.regModalToggle();
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
    login() {
      axios
        .post(`${this.url}/login`, {
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.requestSuccess = res.data.message;
          this.loginModalToggle();
          let bearer = `Bearer ${res.data.token}`;
          localStorage.setItem("bearer", bearer);
          if (this.$route.path !== "/") this.$router.push("/");
          this.getAllFixtures();
        })
        .catch(e => console.log(e));
    },
    register() {
      axios
        .post(`${this.url}/register`, {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        .then(res => {
          this.requestSuccess = res.data.message;
          this.loggedIn = true;
          this.regModalToggle();
          this.loginModalToggle();
        })
        .catch(e => console.log(e));
    }
  },
  mounted() {
    if (localStorage.getItem("bearer") !== null) {
      this.loggedIn = true;
      this.getAllFixtures();
    }
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 320px;
}

.auth {
  font-weight: bold;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  display: inline;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

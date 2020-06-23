<template>
  <div
    id="app"
    class="container mx-auto max-w-md bg-gray-300 h-screen relative"
  >
    <header class="bg-gray-900 px-4 py-3 flex items-center justify-between">
      <div>
        <img class="h-8" src="https://placeimg.com/30/30/tech" alt="app logo" />
      </div>

      <div>
        <div id="nav" class="text-gray-500 focus:text-white focus:outline-none">
          <router-link to="/">Teams</router-link> |
          <router-link to="/fixtures">Fixtures</router-link> |
          <span @click="showModal" class="login cursor-pointer">Login</span>
        </div>
      </div>
    </header>
    <router-view />
    <div
      class="h-screen absolute w-full top-0 left-0 bg-gray-500"
      v-show="loginModalState"
    >
      <div class="w-full max-w-xs m-auto">
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10"
          @submit="login"
        >
          <span
            class="bg-white shadow-md font-bold float-right rounded-full p-2 cursor-pointer            h-8 w-8"
            @click="loginModalToggle"
            >x</span
          >
          <h1 class="font-bold text-2xl mb-10">Login</h1>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
            <p class="text-red-500 text-xs italic">Please choose a password.</p>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
            <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.login {
  color: #42b983;
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

<script>
export default {
  data() {
    return {
      loginModalState: false,
    };
  },
  methods: {
    loginModalToggle() {
      this.loginModalState = !this.loginModalState;
    },
    showModal() {
      this.loginModalToggle();
    },
    login() {
      alert("logging in");
    },
  },
};
</script>

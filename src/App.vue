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
          <router-link to="/fixtures">Fixtures</router-link>
        </div>
      </div>
    </header>
    <router-view />
  </div>
</template>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
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

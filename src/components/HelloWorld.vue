<template>
  <div
    class="bg-purple-600 text-black sm:bg-green md:bg-blue md:text-yellow lg:bg-red xl:bg-orange"
  >
    Test
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

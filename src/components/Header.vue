<template>
  <div
    class="flex text-2xl text-white bg-gray-400 p-7 justify-evenly"
    data-testid="header"
  >
    <div>
      <router-link class="m-5" to="/">Home</router-link>
    </div>
    <div>
      <router-link class="m-5" to="/user">User</router-link>
    </div>
    <div v-if="!user?.id" class="flex">
      <div>
        <router-link class="m-5" to="/signup">Signup</router-link>
      </div>
      <div>
        <router-link class="m-5" to="/login">Login</router-link>
      </div>
    </div>
    <div v-else>
      <router-link class="m-5" to="/profile">{{ user.name }}</router-link>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  name: 'Header',
  setup() {
    const store = useStore();
    const user = computed(() => {
      return store.state.user;
    });
    return {
      user,
    };
  },
};
</script>

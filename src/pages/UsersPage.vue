<template>
  <div data-testid="users-page">
    <h1>users Page</h1>
    <div v-if="users.length > 0" class="flex flex-col">
      <div
        data-testid="user-list"
        v-for="user in users"
        :key="user.id"
        class="p-5 m-5 rounded-lg"
      >
        <h1>{{ user.name }}</h1>
        <p>{{ user.email }}</p>
      </div>
    </div>
    <div v-else>
      No User
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  name: 'UserPage',
  setup() {
    const users = ref([]);
    onMounted(async () => {
      try {
        const { data } = await axios.get('/api/users');
        users.value = data;
      } catch (e) {
        users.value = [];
      }
    });
    return {
      users,
    };
  },
};
</script>

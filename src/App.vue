<template>
  <Header />
  <router-view />
</template>

<script>
import Header from './components/Header.vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { onMounted } from 'vue';

export default {
  name: 'App',
  components: {
    Header,
  },
  setup() {
    const store = useStore();
    onMounted(async () => {
      try {
        const { data } = await axios.get('/api/currentUser', {
          withCredentials: true,
        });
        store.dispatch('setUser', data);
      } catch (e) {
        store.dispatch('discardUser');
      }
    });
  },
};
</script>

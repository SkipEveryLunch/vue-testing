<template>
  <div data-testid="user-page">
    <h1>user{{userId}} Page</h1>
  </div>
</template>
<script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const { userId } = route.params;
    return {
      userId,
    };
  },
};
</script>

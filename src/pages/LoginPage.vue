<template>
  <div class="h-full" data-testid="login-page">
    <h1 class="my-10 text-3xl text-center">
      Login
    </h1>
    <div class="flex justify-center w-2/3 p-10 mx-auto bg-gray-200 rounded-lg">
      <div class="flex flex-col w-2/3">
        <Input
          id="email"
          @custom-input="onChangeEmail"
          :modelValue="form.email"
          :error="errors.email"
        />
        <Input
          id="password"
          :modelValue="form.password"
          @custom-input="onChangePassword"
          :error="errors.password"
        />
        <div class="flex justify-center my-5">
          <button
            v-if="!isCalling"
            :disabled="disabled"
            class="btn btn-blue"
            @click="onSubmit"
          >
            Login
          </button>
          <button
            v-else
            disabled
            class="flex items-center btn btn-blue-loading"
          >
            <Spinner />Loading...
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, computed, watch } from 'vue';
import axios from 'axios';
import Spinner from '../components/Spinner.vue';
import Input from '../components/Input.vue';
import { useRouter } from 'vue-router';
export default {
  components: {
    Spinner,
    Input,
  },
  setup() {
    const router = useRouter();
    const form = reactive({
      email: '',
      password: '',
    });
    const errors = reactive({
      email: ['メールアドレスが未入力です'],
      password: ['パスワードが未入力です'],
    });
    watch(form, () => {
      const mailReg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/;
      if (form.email.length === 0) {
        pushToArr(errors.email, 'メールアドレスが未入力です');
      } else {
        deleteFromArr(errors.email, 'メールアドレスが未入力です');
      }
      if (form.email.length > 0 && !mailReg.test(form.email)) {
        pushToArr(errors.email, '正しいメールアドレスを入力して下さい');
      } else {
        deleteFromArr(errors.email, '正しいメールアドレスを入力して下さい');
      }
      if (form.password.length === 0) {
        pushToArr(errors.password, 'パスワードが未入力です');
      } else {
        deleteFromArr(errors.password, 'パスワードが未入力です');
      }
    });
    const pushToArr = (arr, str) => {
      if (!arr.includes(str)) {
        arr.push(str);
      }
    };
    const deleteFromArr = (arr, str) => {
      if (arr.includes(str)) {
        arr = arr.splice(arr.indexOf(str), 1);
      }
    };
    const isCalling = ref(false);
    const disabled = computed(() => {
      return !(
        errors.email.length === 0 &&
        errors.password.length === 0 &&
        !isCalling.value
      );
    });
    const onSubmit = async () => {
      isCalling.value = true;
      try {
        const res = await axios.post('/api/login', form, {
          withCredentials: true,
        });
        if (res.status === 200) {
          isCalling.value = false;
          router.push('/user');
        }
      } catch (error) {
        isCalling.value = false;
      }
    };
    const onChangeEmail = (payload) => {
      form.email = payload;
    };
    const onChangePassword = (payload) => {
      form.password = payload;
    };
    return {
      form,
      disabled,
      onSubmit,
      isCalling,
      onChangeEmail,
      onChangePassword,
      errors,
    };
  },
};
</script>

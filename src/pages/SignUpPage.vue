<template>
  <div class="h-full" data-testid="signup-page">
    <h1 class="my-10 text-3xl text-center">
      Sign Up
    </h1>
    <div class="flex justify-center w-2/3 p-10 mx-auto bg-gray-200 rounded-lg">
      <div class="flex flex-col w-2/3">
        <Input
          id="name"
          @custom-input="onChangeName"
          :modelValue="form.name"
          :error="errors.name"
        />
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
        <Input
          id="password-repeat"
          @custom-input="onChangePasswordRepeat"
          :modelValue="form.password_repeat"
          :error="errors.password_repeat"
        />
        <div class="flex justify-center my-5">
          <button
            v-if="!isCalling"
            :disabled="disabled"
            class="btn btn-blue"
            @click="onSubmit"
          >
            Sign Up
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
export default {
  components: {
    Spinner,
    Input,
  },
  setup() {
    const form = reactive({
      name: '',
      email: '',
      password: '',
      password_repeat: '',
    });
    const errors = reactive({
      name: ['名前が未入力です'],
      email: ['メールアドレスが未入力です'],
      password: ['パスワードが未入力です'],
      password_repeat: ['パスワード確認が未入力です'],
    });
    watch(form, () => {
      if (form.name.length === 0) {
        pushToArr(errors.name, '名前が未入力です');
      } else {
        deleteFromArr(errors.name, '名前が未入力です');
      }
      if (form.name.length > 12) {
        pushToArr(errors.name, '名前は12字以内です');
      } else {
        deleteFromArr(errors.name, '名前は12字以内です');
      }
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

      if (form.password_repeat.length === 0) {
        pushToArr(errors.password_repeat, 'パスワード確認が未入力です');
      } else {
        deleteFromArr(errors.password_repeat, 'パスワード確認が未入力です');
      }

      if (form.password !== form.password_repeat) {
        pushToArr(errors.password_repeat, 'パスワードと違います');
      } else {
        deleteFromArr(errors.password_repeat, 'パスワードと違います');
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
        errors.name.length === 0 &&
        errors.email.length === 0 &&
        errors.password.length === 0 &&
        errors.password_repeat.length === 0 &&
        !isCalling.value
      );
    });
    const onSubmit = async () => {
      isCalling.value = true;
      try {
        const { status } = await axios.post('/api/register', form);
        if (status === 200) {
          isCalling.value = false;
        }
      } catch (error) {
        isCalling.value = false;
      }
    };
    const onChangeName = (payload) => {
      form.name = payload;
    };
    const onChangeEmail = (payload) => {
      form.email = payload;
    };
    const onChangePassword = (payload) => {
      form.password = payload;
    };
    const onChangePasswordRepeat = (payload) => {
      form.password_repeat = payload;
    };
    return {
      form,
      disabled,
      onSubmit,
      isCalling,
      onChangeName,
      onChangeEmail,
      onChangePassword,
      onChangePasswordRepeat,
      errors,
    };
  },
};
</script>

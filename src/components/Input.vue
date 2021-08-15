<template>
  <div class="flex flex-col mb-2">
    <label class="mb-2" :for="id">{{capitalize(id)}}:</label>
    <input :id="id" :type="type" class="customInput" @input="onInput" :value="modelValue"/>
    <span class="text-red-600">{{error.join(" ")}}</span>
  </div>
</template>
<script>
import {computed} from "vue";
export default{
  props:["id","error","modelValue"],
  emits:["custom-input"],
  setup(props,{emit}){
    const capitalize =(letter)=>{
      let result;
      if(!letter.includes("-")){
        result = letter.charAt(0).toUpperCase() + letter.slice(1)
      }else{
        result = letter.split("-").map(el=>{
          return el.charAt(0).toUpperCase() + el.slice(1);
        }).join(" ");
      }
      return result;
    }
    const type = computed(()=>{
      return props.id.includes("password")?"password":"text";
    });
    const onInput =(e)=>{
      emit("custom-input",e.target.value);
    }
    return{
      capitalize,type,onInput
    }
  }
}
</script>


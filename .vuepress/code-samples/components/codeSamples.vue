<template>
  <tabs type="border-card">
    <tab v-for="sample in samples" :key="sample.language" :label="sample.label">
      <div v-html="sample.code" />
    </tab>
  </tabs>
</template>

<script>
// globals CODE_SAMPLES
export default {
  name: 'CodeSamples',
  props: {
    id: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      samples: undefined,
    }
  },
  created() {
    this.samples = CODE_SAMPLES[this.id]
  },
}
</script>

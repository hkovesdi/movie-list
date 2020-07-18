<template>
  <div style="margin: 0 auto; max-width: 1200px;">
    <h3>Basic info</h3>
    <h3>Personalization</h3>
    <h2>Register</h2>
    <v-form>
      <v-text-field label="Email" placeholder="you@example.com" outlined></v-text-field>
      <v-text-field label="Username" placeholder="JohnDoe" outlined></v-text-field>
      <v-text-field type="password" label="Password" placeholder="asd" outlined></v-text-field>
      <v-file-input label="Avatar" placeholder="only .jpg and .png allowed" outlined></v-file-input>
      <v-text-field label="Describe yourself in 50 characters" placeholder="Coffee -> Code" outlined></v-text-field>
    </v-form>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>

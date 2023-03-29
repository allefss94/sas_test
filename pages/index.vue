<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col cols="6" class="mt-5">
        <b-card>
          <b-card-text class="h2">Login</b-card-text>

          <b-form @submit.prevent="onSubmit">
            <b-form-group
              id="email"
              label="E-mail"
              label-for="email"
              description="E-mail address"
            >
              <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="email@mailer.com"
              />
            </b-form-group>

            <b-form-group
              id="password"
              label="Password"
              label-for="password"
              description="Your secret password"
            >
              <b-form-input
                id="password"
                v-model="form.password"
                type="password"
                required
                placeholder="secret... *****"
              />
            </b-form-group>

            <b-button type="submit" variant="primary" block>
              <b-spinner
                v-if="$store.getters['user/isLoading']"
                label="loading"
              />
              <p v-else class="m-0">login</p>
            </b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data: () => ({
    showPassword: true,
    form: {
      email: '',
      password: '',
    },
  }),
  mounted() {
    // this.$toast.error('ahsuahsuh')
  },
  methods: {
    async onSubmit() {
      const data = await this.$store.dispatch('user/login', {
        login: {
          email: 'task@searchandstay.com',
          password: 'ph37i45K',
        },
      })

      if (data) {
        this.$router.push('/Auth')
      }
    },
  },
}
</script>

<template>
  <b-container>
    <h1 class="h1 text-center my-5">House Rules</h1>
    <b-button
      variant="primary"
      class="my-2"
      @click="$bvModal.show('createModal')"
    >
      <b-icon icon="plus" />
      New rule
    </b-button>
    <b-table striped hover :items="computedItems" :fields="fields">
      <template #cell(active)="{ item }">
        <p>{{ item.active ? 'Active' : 'Deactive' }}</p>
      </template>

      <template #cell(actions)="{ item }">
        <b-button variant="danger" @click="showDeleteModal(item)">
          <b-icon icon="trash" />
        </b-button>
        <b-button variant="info" @click="showUpdateModal(item)">
          <b-icon icon="pencil" />
        </b-button>
      </template>
    </b-table>
    <b-button variant="primary" block class="my-2" @click="$router.push('/')">
      Return to home page
      <b-icon-house />
    </b-button>

    <!-- create modal -->
    <b-modal id="createModal">
      <b-form @submit.prevent="createRule">
        <b-form-group
          id="rule"
          label="Rule name"
          label-for="rule"
          description="House rule"
        >
          <b-form-input
            id="rule"
            v-model="form.name"
            type="text"
            required
            placeholder="Rule Name"
          />
        </b-form-group>
        <b-button type="submit" variant="primary" block>
          <b-spinner v-if="$store.getters['user/isLoading']" label="loading" />
          <p v-else class="m-0">create</p>
        </b-button>
      </b-form>
      <template #modal-footer>
        <div></div>
      </template>
    </b-modal>

    <!-- delete modal -->
    <b-modal id="deleteModal">
      <b-form @submit.prevent="deleteItem">
        <h1 class="h4">
          You realy want to delete? <span class="font-italic h5"></span>
        </h1>
        <b-button type="submit" variant="danger" block>
          <b-spinner v-if="$store.getters['user/isLoading']" label="loading" />
          <p v-else class="m-0">delete</p>
        </b-button>
      </b-form>
      <template #modal-footer>
        <div></div>
      </template>
    </b-modal>

    <!-- update modal -->
    <b-modal id="updateModal">
      <b-form @submit.prevent="updateItem">
        <b-form-group id="rule" label="Rule name" label-for="rule">
          <b-form-input
            id="rule"
            v-model="selectedItem.name"
            type="text"
            required
            placeholder="Rule Name"
          />

          <b-form-checkbox
            id="isActive"
            v-model="selectedItem.active"
            name="isActive"
            checked
            :unchecked-value="false"
          >
            This rule is Active?
          </b-form-checkbox>
        </b-form-group>
        <b-button type="submit" variant="info" block>
          <b-spinner v-if="$store.getters['user/isLoading']" label="loading" />
          <p v-else class="m-0">update</p>
        </b-button>
      </b-form>
      <template #modal-footer>
        <div></div>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: 'Authenticated',
  middleware: 'auth',
  data: () => ({
    fields: ['id', 'name', 'active', 'order', 'actions'],
    form: {
      name: '',
    },
    selectedItem: {},
  }),
  computed: {
    computedItems() {
      return this.$store.getters['user/houseRules'] || []
    },
  },
  methods: {
    showDeleteModal(item) {
      this.selectedItem = item
      this.$bvModal.show('deleteModal')
    },
    showUpdateModal(item) {
      this.selectedItem = JSON.parse(JSON.stringify(item))
      this.selectedItem.active = false
      this.$bvModal.show('updateModal')
    },
    async deleteItem() {
      await this.$store.dispatch('user/deleteItem', this.selectedItem)
      this.$bvModal.hide('deleteModal')
    },
    async updateItem() {
      await this.$store.dispatch('user/updateItem', {
        id: this.selectedItem.id,
        payload: {
          house_rules: {
            name: this.selectedItem.name,
            active: this.selectedItem.active ? 1 : 0,
          },
        },
      })

      this.$bvModal.hide('updateModal')

      // this.$router.push('/success')
    },
    async createRule() {
      await this.$store.dispatch('user/createHouseRule', {
        house_rules: {
          name: this.form.name,
          active: 1,
        },
      })
      this.form.name = ''
      this.$bvModal.hide('createModal')
    },
  },
}
</script>

<template>
  <div class="inside grid justify-center content-center">
    <ul role="list" v-if="events">
      <li role="listitem" v-for="(event, index) in events" :key="`event--${index}`" >
        <EventCard :event="event.attributes" />
      </li>
    </ul>
    <div v-else v-show="!eventsFail">
      Loading Events
    </div>
    <EventNotFound v-if="eventsFail" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['events', 'eventsFail']),
  methods: {
  /**
   * Fetch events from store
   * @return {void}
   */
    async fetchEvents() {
      await this.$store.dispatch('fetchContent')
    }
  },
  mounted() {
    this.fetchEvents()
  }
}
</script>

<style scoped>
a { display: inline-flex; }
.inside {
  margin-top: 2rem;
}
</style>

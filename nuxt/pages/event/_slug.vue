<template>
  <div class="inside">
    <h1 v-if="event">
      {{ event.field_display_title }}
    </h1>
    <div class="event">
      <div v-if="event" class="event__description">
        <div v-html="eventDescription(event)"></div>
      </div>
      <div v-else>
        Error loading Event
      </div>
      <aside v-if="event">
        <div class="meta-info">
          <span class="sr-only">Event dates</span>
          <fa icon="calendar-days" />
          <span>{{ prettyDate(event.field_start_date) }} - {{ prettyDate(event.field_end_date) }}</span>
        </div>
        <div class="meta-info">
          <span class="sr-only">Event times</span>
          <fa icon="clock" />
          <span>{{ prettyTime(event.field_start_time) }} - {{ prettyTime(event.field_end_time) }}</span>
        </div>
      </aside>
      <footer>
        <div class="meta-info">
          <span class="sr-only">Address</span>
          <fa icon="map" /> <address-card />
        </div>
        <div class="meta-info">
          <span class="sr-only">Email</span>
          <fa icon="envelope" /> <a :href="`mailto:${event.field_contact_email}`">{{ event.field_contact_email }}</a>
        </div>
      </footer>
    </div>
    <nuxt-link to="/" class="btn">&larr; Return to Events</nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddressCard from '../../components/AddressCard.vue'
export default {
  components: { AddressCard },
  computed: mapState(['event']),
  methods: {
    /**
     * String helper for Description
     * @param   {object}  event - Event object as offered by drupal api
     * @return  {string}          Processed description
     */
    eventDescription(event) {
      return event.field_description.processed
    },
    /**
     * Convert machine-readable date to human-readable date
     * @param {string} dateString - Date as offered by drupal api
     */
    prettyDate(dateString) {
      return new Date(dateString).toLocaleString("en-AU", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    },
    /**
     * Convert machine-readable date/time to human-readable time
     * @param   {string}    timeString    - Date/Time as offered by drupal api
     * @return  {string}
     */
    prettyTime(timeString) {
      return new Date(new Date(timeString).getTime()).toLocaleTimeString("en-AU", {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    }
  },
  /**
   * Fetch event data from store
   * @return  {void}
   */
  async fetch () {
    await this.$store.dispatch('fetchEventBySlug', this.$route.path)
  }
}
</script>

<style scoped>
@media (min-width: 768px) {
  .event {
    display: grid;
    grid-template-columns: 7fr 3fr;
  }
}
.meta-info {
  display: flex;
  align-items: center;
  grid-gap: 1rem;
  margin: 1rem 0;
}
h1 {
  font-size: 2rem;
  margin-bottom: 1.25rem;
  font-weight: bold;
}
.svg-inline--fa {
  width: 2rem;
  height: 2rem;
}
@media (min-width: 524px) {
  aside {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 768px) {
  aside {
    display: block;
  }
  .event__description {
    padding-right: 2rem;
  }
}

.event__description p {
  margin-bottom: 1rem;
}
.inside {
  padding: 2rem;
}
</style>

<template>
  <div class="card max-w-screen-md bg-base-100 shadow-xl">
    <div class="card-body">
      <h3 class="card-title">
        {{ event.field_display_title }}
      </h3>
      <div v-html="eventSummary(event.field_description)"></div>
      <nuxt-link to="/event/2022-02-19-rememberance-day-activities" class="btn">View Event</nuxt-link>
      <div class="self-end">
        <span>
          <span class="sr-only">Event Dates</span>
          <fa icon="calendar-days" />
          <span>{{ prettyDate(event.field_start_date) }} - {{ prettyDate(event.field_end_date) }}</span>
        </span>
        <span>
          <span class="sr-only">Event Times</span>
          <fa icon="clock" />
          <span>{{ prettyTime(event.field_start_time) }} - {{ prettyTime(event.field_end_time) }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    /**
     * Trim description to 300 words or less
     * @param   {object}  description - description object as offered by drupal api
     * @return  {string}              - trimmed description
     */
    eventSummary(description) {
      return description.summary ?
        description.summary :
        description.processed.substring(-1, 300) + '...'
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
  }
}
</script>

<!-- <address-card />
      <div v-if="event.attributes.field_contact_phone">Phone: {{event.attributes.field_contact_phone}}</div>
      <div>field_end_time: {{event.attributes.field_end_time }}</div>
      <div>field_start_time: {{event.attributes.field_start_time }}</div>
      <div v-if="event.attributes.field_contact_email">Email: {{event.attributes.field_contact_email}}</div> -->

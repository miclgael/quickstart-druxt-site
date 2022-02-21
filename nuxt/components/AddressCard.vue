<template>
  <div class="vcard">
    <div class="fn org">{{ event.field_address.organization }}</div>
    <div class="adr">
      <div class="street-address">{{ event.field_address.address_line1 }}</div>
      <span class="locality">{{ event.field_address.address_line2 }}</span>,
      <span class="postal-code">{{ event.field_address.postal_code }}</span>
      <div class="country-name">Australia</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['event'])
}
</script>

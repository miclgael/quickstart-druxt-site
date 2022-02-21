export const state = () => ({
  events: [],
  eventsFail: false,
  eventsFetched: false,
  event: {},
})

export const mutations = {
  setEvents(state, payload) {
    state.events = payload
  },
  toggleEventFail(state) {
    state.eventsFail = true
  },
  toggleEventsFetched(state) {
    state.eventsFetched = true
  },
  setEvent(state, payload) {
    state.event = payload
  }
}

export const actions = {
  /**
   * Fetch events from Drupal backend
   * @return {void}
   */
  async fetchContent({ commit }) {
   const baseUrl = 'https://8080-miclgael-quickstartdruxt-b5am05kf8ai.ws-us33.gitpod.io/jsonapi'
   const events = await fetch(`${baseUrl}/node/event`)
      .then(res => res.json())
      .then(json => json.data)
      .catch(error => {
        commit('toggleEventFail')
        console.log(error)
      })
    commit('toggleEventsFetched')
    commit('setEvents', events)
  },

  /**
   * Filter already fetched events to find event with matching slug
   * @return {void}
   */
  async fetchEventBySlug({ commit, state, dispatch }, payload) {
    if (!state.eventsFetched) {
      await dispatch('fetchContent')
    }
    const eventData = await state.events.find(event => {
      return event.attributes.path.alias === payload
    })
    commit('setEvent', eventData.attributes)
  }
}

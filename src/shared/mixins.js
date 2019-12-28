import moment from 'moment';

/* eslint-disable import/prefer-default-export */
export const formatDate = {
  methods: {
    formatDate(date, desiredFormat) {
      return moment(date).format(desiredFormat);
    },
  },
};

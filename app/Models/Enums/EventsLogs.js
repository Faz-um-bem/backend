const eventLogTypes = Object.freeze({
  create: 0,
  update: 1,
  requestApproval: 2,
});

const eventLogStatus = Object.freeze({
  rejected: 0,
  approved: 1,
  underReview: 2,
});

module.exports = { eventLogTypes, eventLogStatus };

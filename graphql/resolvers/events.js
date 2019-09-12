const Event = require('../../models/event');
const {dateToString} = require('../../utils/date');
const {transformEvent} = require('./resolverUtils');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString,
      creator: '5d612d5fbea1a4ad421c6703'
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const creator = await User.findById('5d612d5fbea1a4ad421c6703');
      if (!creator) throw new Error('User does not exist.');
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      throw err;
    }
  }
};
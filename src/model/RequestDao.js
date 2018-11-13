/* eslint-disable class-methods-use-this, no-console */
const mongoose = require('mongoose');
const RequestSchema = require('./requestSchema');

class RequestDao {
  saveRequest(url, ended) {
    const newRequest = RequestSchema({
      _id: new mongoose.Types.ObjectId(),
      url,
      ended,
    });

    newRequest.save((err) => {
      if (err) throw err;

      console.log('Request successfully saved');
    });
  }

  findSingleRequestUrlByEndDate(end) {
    return RequestSchema.find({ ended: { $lte: end } }, (err, requestObject) => {
      if (err) throw err;

      if (requestObject.status && requestObject.request.length > 0) {
        const request = requestObject.request[0];
        console.log(`Found request: ${request}`);
        return request.url;
      }
      return '';
    });
  }
}

module.exports = RequestDao;

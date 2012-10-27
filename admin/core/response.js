var http, res, log;

http = require( 'http' );
res  = http.ServerResponse.prototype;



/**
 * Send a response with the given `body` and optional `headers` and `status` code.
 *
 * Examples:
 *
 *     res.send(new Buffer('wahoo'));
 *     res.send({ some: 'json' });
 *     res.send('<p>some html</p>');
 *     res.send('Sorry, cant find that', 404);
 *     res.send('text', { 'Content-Type': 'text/plain' }, 201);
 *     res.send(404);
 *
 * @param {String|Object|Number|Buffer} body or status
 * @param {Object|Number} headers or status
 * @param {Number} status
 * @return {ServerResponse}
 * @api public
 */

res.send = function(body, headers, status){
  // allow status as second arg
  if ('number' == typeof headers) {
    status  = headers,
    headers = null;
  }

  // default status
  status = status || this.statusCode;

  // determine content type
  switch (typeof body) {
    case 'number':
      if (!this.header('Content-Type')) {
        this.contentType('.txt');
      }
      body = http.STATUS_CODES[status = body];
      break;
    case 'string':
      if (!this.header('Content-Type')) {
        this.charset = this.charset || 'utf-8';
        this.contentType('.html');
      }
      break;
    case 'boolean':
    case 'object':
      if (Buffer.isBuffer(body)) {
        if (!this.header('Content-Type')) {
          this.contentType('.bin');
        }
      } else {
        return this.json(body, headers, status);
      }
      break;
  }

  // populate Content-Length
  if (!this.header('Content-Length')) {
    this.header('Content-Length', Buffer.isBuffer(body)
      ? body.length
      : Buffer.byteLength(body));
  }

  // merge headers passed
  if (headers) {
    var fields = Object.keys(headers);
    for (var i = 0, len = fields.length; i < len; ++i) {
      var field = fields[i];
      this.header(field, headers[field]);
    }
  }

  // strip irrelevant headers
  if (204 == status || 304 == status) {
    this.removeHeader('Content-Type');
    this.removeHeader('Content-Length');
  }

  // respond
  this.statusCode = status;
  LOG.response( status, this, this.result );
  this.end('HEAD' == this.req.method ? undefined : body);
  return this;
};

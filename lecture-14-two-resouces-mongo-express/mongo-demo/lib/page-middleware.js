'use strict';

module.exports = function(req, res, next){
  req.query.page = req.query.page || 1;
  req.query.pagesize = req.query.pagesize || 50;
  req.query.offset = 0;
  if (req.query.page < 1) req.query.page = 1;
  if (req.query.pagesize < 1) req.query.pagesize = 1;
  if (req.query.offset < 0) req.query.pagesize = 0;
  next();
};

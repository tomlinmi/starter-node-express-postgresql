/*can then access the methods on the service object to perform CRUD operations on a table (for example, categoriesService.list()). Chaining then() to categoriesService.list() executes the Knex query. Chaining catch(next) onto the promise will call next() passing in the error. If the Knex promise doesn't have a catch(next) at the end, it will not correctly handle errors that occur during when running the query.*/

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const categoriesService = require("./categories.service");

async function list(req, res) {
  const data = await categoriesService.list();
  res.json({ data });
}


module.exports = {
  list: asyncErrorBoundary(list),
};

/*make sure that your server is running and visit localhost:5000/categories in the browser. You will get back a list of all the categories data.*/
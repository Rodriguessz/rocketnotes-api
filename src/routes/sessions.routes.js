const { Router } = require('express');

const SessionsController = require('../controllers/Sessions/SessionsController')
const sessionsController = new SessionsController();

const sessionsRouter = Router();


sessionsRouter.post("/", sessionsController.create)


module.exports = sessionsRouter;
import app from './src/middleware/appRouteMiddlewares.js';
import ENV from './src/config/keys.js';
import print from './src/utils/print.js';
import DB from './src/config/db.js';
import AppRoutes from './src/routes/index.js';
import { globalErrorHandlerMiddleware, handleApiNotFound, handleSIGINT, handleUncaughtException } from './src/utils/error/globalErrorHandlers.js';
// apis
app.use('/api/v1/', AppRoutes);

const dateDeployed = `${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`;
app.get('/', (req, res) => {
    res.send(`Welcome to crm-system (${process.env.NODE_ENV})  LDA : ${dateDeployed}`);
});
// route not found
app.use(handleApiNotFound);

// error handler
app.use(globalErrorHandlerMiddleware);

// uncaughtException and unhandledRejection
process.on('uncaughtException', handleUncaughtException);
process.on('unhandledRejection', handleUncaughtException);

process.on('SIGINT', handleSIGINT);

app.listen(ENV.PORT, () => {
    print('info', `easy-e-money is running on port ${ENV.PORT}...`);
    print('info', `This is ${process.env.NODE_ENV} environment...`);
    DB();
});
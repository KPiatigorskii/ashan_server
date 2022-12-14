/** source/server.ts */
import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import categoryRoutes from './routes/category.routes';
import employeeRoutes from './routes/employee.routes';
import productRoutes from './routes/product.routes';
import storeRoutes from './routes/store.routes';
import userRoutes from './routes/user.routes';
// import schoolRouters from './routes/school.routers';

const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

// /** Routes */
router.use('/category/', categoryRoutes.router);
router.use('/employee/', employeeRoutes.router);
router.use('/product/', productRoutes.router);
router.use('/store/', storeRoutes.router)
router.use('/user/', userRoutes.router)

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6978;
httpServer.listen(
    PORT, 
    () => {
        console.log(`The server is running on port ${PORT}`)
    });
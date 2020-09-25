const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

/**
 * @swagger
 * /api/payment:
 *  get:
 *    tags: 
 *          - Payment 
 *    security:
 *          - Bearer: []
 *    description: To get all the categories
 *    parameters:
 *             - name: authorization
 *               in: header
 *               type: string
 *               required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/payment').get(auth,authAdmin, paymentCtrl.getPayments)

router.route('/payment').post(auth, paymentCtrl.createPayment)



module.exports = router
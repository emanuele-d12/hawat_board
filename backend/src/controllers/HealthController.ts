import { env } from '../config/env'

class HealthController {

    getHealth(_req, res) {

        return res.json({

            status: 'UP',

            instance: env.instanceName,

            version: env.version,

        })

    }

}

export default new HealthController()
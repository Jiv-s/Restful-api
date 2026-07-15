import joi from 'joi'

class BaseDto {
    static schema = joi.object({}) // acts as a empty container will use as req
    static validate(data){
        if (!this.schema) {
            throw new Error('Schema is not defined on this DTO');
        }

        const { error, value } = this.schema.validate(data, {
            abortEarly: false, // sare errors eksath dedo
            stripUnknown: true // only fiels defined by me
        })

        if (error) {
            const msg = error.details.map(d => d.message).join(', ')
            throw new Error(msg)
        }

        return { errors: null, value } //make sure of the consistency is maintained 
    }
}

export default BaseDto
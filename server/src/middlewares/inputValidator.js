import Joi from "joi";

const userSchema = Joi.object({
  emp_id: Joi.string().when("$isPut",{
    is: true,
    then: Joi.optional(),
    otherwise: Joi.required()
  }),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  designation: Joi.string().required(),
  salary: Joi.number().required()
});

const validateUser = (req, res, next) => {
    const isPutRequest = req.method === "PUT";
    const { error } = userSchema.validate(req.body,{context: {isPut: isPutRequest}});
    if(error){
        return res.status(400).json({
            status:400,
            message:error.details[0].message,
        });
    }
    next(); 
};

export default validateUser;
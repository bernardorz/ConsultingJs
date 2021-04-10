import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../repositories/SurveysRepository'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepotirory'
import { UserRepository } from '../repositories/UserRespository'


class SendMailController{

 async execute ( request: Request, response : Response){
    const { email, survey_id } = request.body

    const usersRepository = getCustomRepository(UserRepository)
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)


    const userAllreadyExist = await usersRepository.findOne({email})

    if(!userAllreadyExist){
       return response.status(400).json({
          error : "User does not exist"
       })
    }

    const surveyAllreadyExist = await surveysRepository.findOne({id : survey_id})

    if(!surveyAllreadyExist){
      return response.status(400).json({
         error : "Survey does not exist"
      })
   }


   const surveyUser = surveysUsersRepository.create({
      user_id: userAllreadyExist.id,
      survey_id
   })

   await surveysUsersRepository.save(surveyUser)


 return response.json(surveyUser)


 }}


export { SendMailController }
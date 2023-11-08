import {
    persistToDatabase,
    retrieveFromDatabase
} from './NIET_OPENEN_WORDT_GEBRUIKT_DOOR_DE_API_FILES/databaseSimulation.js'
import {faker} from '@faker-js/faker'


export interface Survey{
    name: string
    id: string
    createdAt: number
}


export const getAllSurveys = async () => {
    const surveys = await retrieveFromDatabase('_surveys') as Survey[]
    return surveys.sort((a, b) => b.createdAt - a.createdAt)
}


interface createSurveyParams{
    name: string
}
export const createSurvey = async ({name}: createSurveyParams): Promise<Survey> => {
    const survey = {
        name,
        id: faker.string.uuid(),
        createdAt: Date.now(),
    }
    const surveys = await retrieveFromDatabase('_surveys')
    await persistToDatabase('_surveys', [...surveys, survey])
    return survey
}

interface deleteSurveyParams{
    id: string
}
export const deleteSurvey = async ({id}: deleteSurveyParams): Promise<void> => {
    const surveys = await retrieveFromDatabase('_surveys') as Survey[]
    await persistToDatabase('_surveys', surveys.filter(s => s.id !== id))
}
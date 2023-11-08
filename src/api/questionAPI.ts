import {
    persistToDatabase,
    retrieveFromDatabase
} from './NIET_OPENEN_WORDT_GEBRUIKT_DOOR_DE_API_FILES/databaseSimulation.js'
import {faker} from '@faker-js/faker'

export interface Question {
    id: string
    surveyId: string
    title: string
    type: 'single-line-answer' | 'multi-line-answer' | 'multiple-select'
    options: {name: string, id: string}[] | null
}

interface GetAllQuestionsForSurveyParams {
    surveyId: string
}

export const getAllQuestionsForSurvey = async ({surveyId}: GetAllQuestionsForSurveyParams): Promise<Question[]> => {
    const allQuestions = (await retrieveFromDatabase('_questions')) as Question[]
    return allQuestions.filter(q => q.surveyId === surveyId)
}

interface retrieveFromDatabaseParams {
    questionId: string
}

export const deleteQuestion = async ({questionId}: retrieveFromDatabaseParams): Promise<void> => {
    const allQuestions = await retrieveFromDatabase('_questions') as Question[]
    if (!allQuestions) return
    await persistToDatabase('_questions', allQuestions.filter(q => q.id !== questionId))
}

interface createQuestionParams {
    surveyId: string
    title: string
    type: 'single-line-answer' | 'multi-line-answer' | 'multiple-select'
    options: Array<{
        name: string,
        id: string,
    }> | null
}

export const createQuestion = async ({surveyId, title, type, options}: createQuestionParams): Promise<Question> => {
    const allQuestions = await retrieveFromDatabase('_questions')
    const question = {
        id: faker.string.uuid(),
        surveyId,
        title,
        type,
        options
    }
    allQuestions.push(question)
    await persistToDatabase('_questions', allQuestions)
    return question
}

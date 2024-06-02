
export type Base64 = string

// CREATE EXERCICE TYPES

export type Question = {
    title : string,
    description : string,
    image?: Base64,
    hint : string,
}

//todo à challenger
type Examples = {
    input: string,
    output: string,
}


export type CreateExerciseFromFrontToBackPayload = {
    courseImages: Base64 []
    theme: string,
}

export type CreateExerciseFromBackToFrontPayload = {
    title: string
    image?: Base64
    questions: Question[]
    courseTextFromAI: string
}

export type CreateExerciseFromBackToOpenAIPayload = {
    context: string
    theme: string
    courseImages: Base64 []
    souvenirs: string
    examples: Examples[]
}

//todo not sure this is needed
export type CreateExerciseFromOpenAIToBack = {}


// CREATE EXERCISE TYPES

export type AnalyzeExerciseFromFrontToBackPayload = {
    questions: Question[]
    solutions: Base64[],
}

export type AnalyzeExerciseFromBackToFrontPayload = {
    grade:string,
    summary: string
    solution: string[]
    solutionStudent: string[]
    comments: string[]
}

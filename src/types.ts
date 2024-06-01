
type Base64 = string

// CREATE EXERCICE TYPES

type Question = {
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


type CreateExerciseFromFrontToBackPayload = {
    courseImages: Base64 []
    theme: string,
}

type CreateExerciseFromBackToFrontPayload = {
    title: string
    image: Base64
    questions: Question[]
    courseTextFromAI: string
}

type CreateExerciseFromBackToOpenAIPayload = {
    context: string
    theme: string
    courseImages: Base64 []
    souvenirs: string
    examples: Examples[]
}

//todo not sure this is needed
type CreateExerciseFromOpenAIToBack = {}


// CREATE EXERCISE TYPES

type AnalyzeExerciseFromFrontToBackPayload = {
    questions: Question[]
    solutions: Base64[],
}

type AnalyzeExerciseFromBackToFrontPayload = {
    successRateImage: Base64
    summary: string
    comments: string[]
}

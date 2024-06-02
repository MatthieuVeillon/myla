import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {AnalyzeExerciseFromBackToFrontPayload, Base64, CreateExerciseFromBackToFrontPayload} from "@/types";

interface StoreState {
    courseImages: Base64[]
    setCourseImages: (image: Base64) => void,
    exercise: CreateExerciseFromBackToFrontPayload,
    setExercise: (newExercise: CreateExerciseFromBackToFrontPayload) => void,
    feedback: AnalyzeExerciseFromBackToFrontPayload
    setFeedback: (feedback: AnalyzeExerciseFromBackToFrontPayload) => void,
}

// const useGlobalStore = create<StoreState>()(
//     devtools(
//         persist(
//             (set) => ({
//                 courseImages: [],
//
//                 setCourseImages:  (newImage) => set(
//                     (currentCourseImages) => ({ courseImages: [...currentCourseImages, newImage]})),
//         ),
//     ),
// )


export const useGlobalStore = create<StoreState>()(
    devtools(
        (set) => ({
            courseImages: [],
            setCourseImages: (newImage) => set((state) => ({courseImages: [...state.courseImages, newImage]})),
            exercise: {
                title: '',
                questions: [],
                courseTextFromAI: '',
            },
            setExercise: (newExercise) => set((state) => ({exercise: newExercise})),
            feedback: {
                summary: '',
                comments: [],
                solution: [],
                solutionStudent: [],
                grade:""
            },
            setFeedback: (newfeedback) => set((state) => ({feedback: newfeedback}))
        }),
        {
            name: 'global-storage',
        },
    ),
)

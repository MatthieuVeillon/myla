"use client"
import {useRouter, useSearchParams} from 'next/navigation';
import Image from 'next/image';
import {Button} from "@/components/ui/button";
import {useGlobalStore} from "@/state/store";
import axios from "axios";
import { CreateExerciseFromBackToFrontPayload, CreateExerciseFromFrontToBackPayload} from "@/types";
import {Suspense, useState} from "react";

type Response = {
    data: CreateExerciseFromBackToFrontPayload
}

const UniversePicker = () => {
    const router = useRouter();
    const courseImages = useGlobalStore((state) => state.courseImages);
    const exercise = useGlobalStore((state) => state.exercise);
    const setExercise = useGlobalStore((state) => state.setExercise);
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams()
    const debug = searchParams.get('debug')

    const chooseUniverse = async (universe: string) => {
        const requestBody = {
            courseImages,
            theme: universe,
        };
        // Send the image to the backend
        try {
            setIsLoading(true)
            const response = await axios.post<CreateExerciseFromFrontToBackPayload, Response>('api/create-exercise', requestBody);
            console.log(response.data);

            //@ts-ignore
           const parsedExercices = extractAndParseJSON(response.data.exercise)
            setExercise(parsedExercices)

            setIsLoading(false)
            router.push(`/exercise-from-ia${debug ? '?debug=true' : ''}`);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold text-center mb-4">
                Choisir ton univers préféré
            </h1>
            <div className="flex flex-wrap justify-center gap-5">
                {isLoading ? <div className="w-full bg-slate-500">Loading</div> : <>
                    <Image
                        src="/harry-potter-image.png" // replace with your image path
                        alt="Harry Potter"
                        width={300}
                        height={150}
                        className="cursor-pointer"
                        onClick={() => chooseUniverse('harry-potter')}
                    />
                    <Image
                        src="/marvel.png" // replace with your image path
                        alt="Marvel"
                        width={300}
                        height={100}
                        className="cursor-pointer"
                        onClick={() => chooseUniverse('marvel')}
                    />
                </>}
                <Button disabled> Ajoute ton propre univers (à venir demain)</Button>
            </div>
        </div>
    );
};


const UniversePickerSuspended = () => {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <UniversePicker />
        </Suspense>
    )
}
export default UniversePickerSuspended;







const courseTextFromAI = "1.⁠ ⁠Expérience aléatoire et issues possibles\n" +
    "2.⁠ ⁠Probabilité d'une issue\n" +
    "3.⁠ ⁠Propriété de la somme des probabilités\n" +
    "4.⁠ ⁠Lien avec les fréquences\n" +
    "5.⁠ ⁠Notion d'évènement\n" +
    "6.⁠ ⁠Évènements incompatibles\n" +
    "7.⁠ ⁠Exemple d'une expérience aléatoire à deux épreuves\n" +
    "\n" +
    "### Détail des notions\n" +
    "\n" +
    "#### 1. Expérience aléatoire et issues possibles\n" +
    "Définition : Une expérience est dite aléatoire lorsqu'elle peut produire plusieurs résultats différents (issues possibles) et qu'il est impossible de prédire avec certitude lequel se produira.\n" +
    "Importance : Comprendre cette notion est fondamental pour saisir le concept de probabilité et la manière dont elle est calculée.\n" +
    "Exemples : \n" +
    "•⁠  ⁠Lancer un dé non truqué avec des issues possibles de 1 à 6.\n" +
    "•⁠  ⁠Tirer une boule d'une urne contenant des boules de différentes couleurs.\n" +
    "\n" +
    "Points clés :\n" +
    "•⁠  ⁠Une expérience aléatoire produit des résultats imprévisibles.\n" +
    "•⁠  ⁠Les issues possibles sont les différents résultats qui peuvent se produire.\n" +
    "\n" +
    "#### 2. Probabilité d'une issue\n" +
    "Définition : La probabilité d'une issue est un nombre compris entre 0 et 1 qui indique la chance d'obtenir cette issue.\n" +
    "Importance : C'est la base du calcul des probabilités, essentiel pour évaluer les chances d'événements dans diverses situations.\n" +
    "Exemples : \n" +
    "•⁠  ⁠Lancer un dé : la probabilité d'obtenir chaque chiffre (1, 2, 3, 4, 5 ou 6) est de 1/6.\n" +
    "•⁠  ⁠Tirer une boule dans une urne avec différentes couleurs : calcul des probabilités en fonction du nombre de boules de chaque couleur.\n" +
    "\n" +
    "Points clés :\n" +
    "•⁠  ⁠La probabilité d'une issue est toujours entre 0 et 1.\n" +
    "•⁠  ⁠La somme des probabilités de toutes les issues d'une expérience aléatoire est égale à 1.\n" +
    "\n" +
    "#### 3. Propriété de la somme des probabilités\n" +
    "Définition : La somme des probabilités de toutes les issues possibles d'une expérience est égale à 1.\n" +
    "Importance : Cette propriété est cruciale pour vérifier que les probabilités attribuées sont correctes.\n" +
    "Exemples :\n" +
    "•⁠  ⁠Lancer un dé : p(1) + p(2) + p(3) + p(4) + p(5) + p(6) = 1.\n" +
    "•⁠  ⁠Tirer une boule d'une urne : somme des probabilités de chaque couleur de boule.\n" +
    "\n" +
    "Points clés :\n" +
    "•⁠  ⁠Vérifier que la somme des probabilités est égale à 1 pour s'assurer que la distribution des probabilités est correcte.\n" +
    "\n" +
    "#### 4. Lien avec les fréquences\n" +
    "Définition : La fréquence d'un événement, lorsque l'expérience est répétée un grand nombre de fois, tend à se rapprocher de la probabilité de cet événement.\n" +
    "Importance : Cela permet de relier la théorie des probabilités avec des observations empiriques.\n" +
    "Exemples :\n" +
    "•⁠  ⁠Lancer un dé 1000 fois : la fréquence d'obtention de chaque chiffre devrait se rapprocher de 1/6.\n" +
    "\n" +
    "Points clés :\n" +
    "•⁠  ⁠La probabilité théorique peut être vérifiée expérimentalement par la fréquence relative.\n" +
    "\n" +
    "#### 5. Notion d'évènement\n" +
    "Définition : Un événement est constitué d'une ou plusieurs issues d'une expérience aléatoire. Il peut être impossible, certain ou probable.\n" +
    "Importance : Comprendre les événements permet d'analyser des situations complexes en termes de probabilités.\n" +
    "Exemples :\n" +
    "•⁠  ⁠Avoir un événement \"obtenir au moins 4\" en lançant un dé.\n" +
    "•⁠  ⁠Avoir un événement \"obtenir une boule bleue ou verte\" en tirant une boule d'une urne.\n" +
    "\n" +
    "Points clés :\n" +
    "•⁠  ⁠La probabilité d'un événement est la somme des probabilités des issues qui le composent.\n" +
    "•⁠  ⁠Un événement impossible a une probabilité de 0.\n" +
    "•⁠  ⁠Un événement certain a une probabilité de 1.\n" +
    "\n" +
    "#### 6. Évènements incompatibles\n" +
    "Définition : Deux événements sont incompatibles s'ils ne peuvent pas se produire en même temps.\n" +
    "Importance : Cette notion est essentielle pour calculer correctement les probabilités de certains événements combinés.\n" +
    "Exemples :\n" +
    "•⁠  ⁠L'événement \"obtenir 5\" et \"obtenir 6\" sont incompatibles lors du lancer d'un dé.\n" +
    "\n" +
    "Points clés :\n" +
    "•⁠  ⁠La probabilité que l'un ou l'autre des événements incompatibles se produise est la somme de leurs probabilités individuelles.\n" +
    "•⁠  ⁠La probabilité qu'un événement ne se produise pas est égale à 1 moins la probabilité qu'il se produise.\n" +
    "\n" +
    "#### 7. Exemple d'une expérience aléatoire à deux épreuves\n" +
    "Définition : Une expérience à deux épreuves consiste à réaliser deux expériences aléatoires successives et à analyser les résultats combinés.\n" +
    "Importance : Permet d'appliquer les principes de probabilité à des situations plus complexes et de comprendre la dépendance entre les épreuves.\n" +
    "Exemples :\n" +
    "•⁠  ⁠Lancer une pièce puis tirer une boule d'une urne.\n" +
    "•⁠  ⁠Représentation par un arbre des probabilités des résultats combinés.\n" +
    "\n" +
    "Points clés :\n" +
    "•⁠  ⁠La probabilité d'une issue combinée est le produit des probabilités des issues individuelles.\n" +
    "•⁠  ⁠Utilisation d'arbres pour représenter visuellement les combinaisons d'issues."


function extractAndParseJSON(input: string) {

    const jsonStart = input.indexOf('```json');
    const jsonEnd = input.lastIndexOf('```');

    if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('No JSON string found in the input');
    }

    const jsonString = input.substring(jsonStart + 7, jsonEnd);
    return JSON.parse(jsonString);
}

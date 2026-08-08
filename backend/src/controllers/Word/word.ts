import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const createWord = async (req: Request, res: Response) => {
    try {
        const {word, definition, example} = req.body
        const userId = req.userId  

        if(!userId) {
            return res.status(401).json({message: "Unauthorized"})
        }

        if(!word){
            return res.status(401).json({message: "Word is required"})
        }

        const newWord = await prisma.word.create({
            data: {word, definition, example, userId}
        })

        return res.status(201).json(newWord)
    } catch (error) {
          console.log("ERROR CAUGHT:", error);
        res.status(500).json({ message: "Something went wrong"  });
    }
} 

export const getWord = async (req: Request, res: Response) => {
    try{
const userId = req.userId

if(!userId){
  return res.status(401).json({message: "Unauthorized"})
}

const words = await prisma.word.findMany({
    where: {userId},
orderBy: {createdAt: "desc"}
})

    return res.status(200).json(words);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export const updateWord = async (req:Request, res:Response) => {
    try{
        const userId = req.userId
        const {id} = req.params as {id: string}
        const {word, definition, example} = req.body

            if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

     const existingWord = await prisma.word.findUnique({ where: { id } });

         if (!existingWord) {
      return res.status(404).json({ message: "Word not found" });
    }
    if (existingWord.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updatedWord = await prisma.word.update({
        where: {id},
        data: {word, definition, example} 
    })
     return res.status(200).json(updatedWord);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export const deleteWord = async (req:Request, res:Response) => {
    try{
        const userId = req.userId
        const {id} = req.params as {id: string}

           if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingWord = await prisma.word.findUnique({
        where: {id}
    })

      if (!existingWord) {
      return res.status(404).json({ message: "Word not found" });
    }
    if (existingWord.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await prisma.word.delete({
        where: {id}
    })
      return res.status(200).json({ message: "Word deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
} 
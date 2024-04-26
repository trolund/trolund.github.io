import { NextApiRequest, NextApiResponse } from "next"
import { search, SearchResult } from '../../search/indexService';

export default function userHandler(
    req: NextApiRequest,
    res: NextApiResponse<SearchResult[]>
  ) {
    const { query, method } = req
    const word = Array.isArray(query.word) ? query.word[0] : query.word
  
    switch (method) {
      case 'GET':
        // Get data from your database
        res.status(200).json(search(word))
        break
      case 'POST':
          // Get data from your database
          res.status(200).json(search(word))
          break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
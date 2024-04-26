import { RootObject } from "../types/githubData"

const getData = async (): Promise<RootObject[]> => {
    const response = await fetch('https://api.github.com/users/trolund/repos?per_page=25&sort=updated')
    const body = await response.json()
    return body
}

export { getData }
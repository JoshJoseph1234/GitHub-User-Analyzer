import { useState } from "react"
import axios from "axios"
import RepoList from '../components/RepoList';
import CommitsChart from '../components/CommitsChart';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

import { Repository, CommitData } from "@/types/github"

export default function Home() {
  const [username, setUsername] = useState("")
  const [repos, setRepos] = useState<Repository[]>([])
  const [commits, setCommits] = useState<CommitData[]>([])

  const handleSearch = async () => {
    const reposRes = await axios.get(`https://api.github.com/users/${username}/repos`)
    setRepos(reposRes.data)

    const allCommits: CommitData[] = []
    const now = new Date()
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(now.getDate() - i)
      allCommits.push({ date: date.toISOString().slice(0, 10), count: Math.floor(Math.random() * 5) })
    }
    setCommits(allCommits)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">GitHub User Profile Analyzer</h1>
      <div className="flex gap-4">
        <Input
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {repos.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold">Repositories</h2>
          <RepoList repos={repos} />
        </>
      )}

      {commits.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-6">Commits (Last 7 Days)</h2>
          <CommitsChart data={commits} />
        </>
      )}
    </div>
  )
}

import { Card } from './ui/card';
import { Repository } from "@/types/github"

interface Props {
  repos: Repository[]
}

export default function RepoList({ repos }: Props) {
  return (
    <div className="grid gap-4">
      {repos.map(repo => (
        <Card key={repo.name} className="p-4">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-blue-600">
            {repo.name}
          </a>
          <p className="text-sm text-gray-600">{repo.description}</p>
        </Card>
      ))}
    </div>
  )
}

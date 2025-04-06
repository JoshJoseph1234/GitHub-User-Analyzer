import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { CommitData } from "@/types/github"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Props {
  data: CommitData[]
}

export default function CommitsChart({ data }: Props) {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: "Commits",
        data: data.map(d => d.count),
        borderColor: "rgba(59,130,246,1)",
        backgroundColor: "rgba(59,130,246,0.2)",
        fill: true,
      },
    ],
  }

  return <Line data={chartData} />
}

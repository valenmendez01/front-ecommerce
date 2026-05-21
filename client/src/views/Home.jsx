export const Home = () => {
  return (
    <div className="p-6 space-y-4">
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="h-24 rounded-xl bg-gray-200 flex items-center justify-center"
        >
          Card {i + 1}
        </div>
      ))}
    </div>
  )
}

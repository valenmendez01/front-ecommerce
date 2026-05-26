const LayoutAuth = ({ children }) => (
  <main className="min-h-screen bg-[#f7f4ec] px-6 py-8 text-[#142b10]">
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center">
      {children}
    </div>
  </main>
)

export default LayoutAuth

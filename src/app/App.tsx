import PostsManagerPage from "../pages/posts-manager"
import { Footer, Header } from "../shared/ui"
import Router from "./routes"
import "./styles/index.css"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostsManagerPage />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

import Demo from "./components/Demo";
import Hero from "./components/Hero";

export default function Home() {
  return ( 
    <main>
      <div className="main">
        <div className="gradient" />
      </div>

      <div className="app">
        <Hero />
        <Demo />
      </div>
    </main>
  );
}
// 53.53
import './About.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-left">
        <h1>Real Estate Price Visualizer</h1>
        <p className="subtitle">An AI-powered web application for property insights</p>

        <p className="description">
          This project leverages machine learning and interactive visualizations to provide insights 
          into real estate listings across multiple Indian cities. Users can explore pricing trends, 
          compare parameters, and analyze the dataset interactively.
        </p>

        <h3>🚀 Tech Stack</h3>
        <ul>
          <li><b>Frontend:</b> React.js (Vite, React Router), Recharts, CSS</li>
          <li><b>Backend:</b> Flask (REST API for model inference)</li>
          <li><b>Machine Learning:</b> Python (Pandas, NumPy, Scikit-learn, CatBoost)</li>
          <li><b>Data:</b> Real estate listings from Makaan.com (via Kaggle)</li>
          <li><b>Deployment:</b> Vercel (frontend) + Render (backend API)</li>
        </ul>


        <h3>🔑 Key Features</h3>
        <ul>
          <li>📊 Interactive visualizations by city, builder, and property type</li>
          <li>⚖️ Dynamic parameter comparison</li>
          <li>🔍 Searchable & sortable dataset explorer</li>
        </ul>

        <h3>📎 Credits</h3>
        <ul>
          <li>
            Dataset:{" "}
            <a 
              href="https://www.kaggle.com/datasets/manishmathias/residential-property-price-indian-cities-dataset" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Kaggle/residential-property-price-dataset
            </a>
          </li>
        </ul>

        <div className="links">
          <a 
            href="https://github.com/Krish2673/Real_Estate_Visualizer" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            🔗 GitHub
          </a>
        </div>
      </div>

      <div className="about-right">
        <img 
          src="/house_searching.png" 
          alt="Illustration of real estate analysis" 
        />
      </div>
    </div>
  );
}

export default About;

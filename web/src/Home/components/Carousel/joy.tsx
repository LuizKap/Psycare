import { Link } from "react-router";

function Joy() {
    return (
        <section className="joy">
            <div className="joy-content emotion-content">
                <h2>Toda emoção conta uma história</h2>

                <p>
                    Observe seus sentimentos e conheça melhor a si mesmo.
                </p>

                <Link to="/mood" className="joy-link emotion-link">Diário do humor</Link>
            </div>

                <img src="/emotions/joy.png" alt="" className="emotion-img" />

            
        </section>
    )
}

export default Joy

import { Link } from "react-router";

function Confidence() {
    return (
        <section className="confidence">
            <div className="confidence-content emotion-content">
                <h2>Acredite na sua jornada</h2>

                <p>
                    Reconheça suas conquistas e descubra a força que existe em você.
                </p>

                <Link to="/journey" className="confidence-link emotion-link">Jornada do campeão</Link>
            </div>

            <img src="/emotions/confidence.png" alt="" className="emotion-img" />

        </section>
    )
}

export default Confidence
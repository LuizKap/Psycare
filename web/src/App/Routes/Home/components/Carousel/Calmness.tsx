import { Link } from "react-router"


function Calmness() {
    return (
        <section className="calmness">
            <div className="calmness-content emotion-content">
                <h2>Encontre sua calma</h2>

                <p>
                    Um espaço para desacelerar, respirar
                    e cuidar de você.
                </p>

                <Link to="/appointments/create" className="calmness-link emotion-link">Marcar uma consulta</Link>
            </div>

                <img src="/emotions/calmness.png" alt="" className="emotion-img"/>

        </section>
    )
}

export default Calmness
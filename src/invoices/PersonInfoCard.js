import {Link} from "react-router-dom";

const PersonInfoCard = ({person, isSeller}) => {
    return (
        <div className="card">
            <div className="card-header">
                {isSeller ? "Dodavatel" : "Odběratel"}
            </div>

            <div className="card-body">
                <Link to={"/persons/show/" + person._id} className="text-black">
                    <h4 className="card-title">{person.name}</h4>
                </Link>

                <h6 className="card-subtitle">Email: {person.mail}</h6>

                <div className="card-text">
                    Telefon: {person.telephone}
                    <br></br>

                <div className="row">
                    <div className="col-2">Adresa:</div>
                    <div className="col">
                        <div>{person.street}</div>
                        <div>{person.zip}</div>
                        <div>{person.city}</div>
                        <div>{person.country}</div>
                    </div>
                </div>

                </div>
            </div>
        </div>
    );

};

export default PersonInfoCard;
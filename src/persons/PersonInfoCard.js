import {Link} from "react-router-dom";

/**
 * Creates a bootstrap card containing basic information of a person/company
 * @param person Contains the data of a person/company
 * @param isSeller Set as true if the person/company is the seller, false if they are the buyer
 * @returns {JSX.Element} Renders the card with the person's/company's info
 * @constructor Makes an instance of this card
 */
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
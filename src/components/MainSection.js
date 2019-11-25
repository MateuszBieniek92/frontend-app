import React from 'react';
import './mainSection.scss';
import sampleImage from '../images/sample-image.png';

function MainSection() {
    return (

        <section className="main-section">
            <div className="main-section__img-wrapper">
                <img src={sampleImage} alt="sample-photo"/>
            </div>
            <div className="main-section__text">
                <h1>Sprawdzone rozwiązania dla Twojej firmy</h1>
                <h2>Niezależnie od tego, czy potrzebujesz nowego logo, strony internetowej, poligrafii,
                    kampanii reklamowej czy znakowanej odzieży dla Twojej firmy, kluczem do sukcesu jest
                    profesjonalne wykonanie i design.
                </h2>
                <div className="btn btn-bordered">Poznaj nas bardziej</div>
            </div>
        </section>
    )
}

export default MainSection;
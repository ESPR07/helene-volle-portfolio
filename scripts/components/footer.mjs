
function renderFooter(){
    const body = document.querySelector("body");
    const footer = document.createElement("footer");

    const logo = document.createElement("span");
    logo.className = "helene-logo";

    const socials = [
        {url: "https://www.facebook.com/profile.php?id=100008958635654", logo: "facebook"},
        {url: "https://www.instagram.com/helenevolle/", logo: "instagram"},
        {url: "mailto:hbvolle@gmail.com", logo: "mail"}
    ];

    const socialsContainer = document.createElement("container");
    socialsContainer.classList = "socials-container";

    socials.forEach((platform) => {
        const link = document.createElement("a");
        link.target = "_blank";
        link.href = platform.url;
        link.className = platform.logo;

        socialsContainer.appendChild(link);
    })


    const creators = [
        {creator: "Ingvild Sandven", url: "mailto:ingvild.sandven@gmail.com"},
        {creator: "Sindre Derås", url: "https://github.com/ESPR07/"}
    ];

    const creditsContainer = document.createElement("container");
    creditsContainer.className = "credits";
    const creditP = document.createElement("p");
    creditP.innerText = "Website by "
    creditsContainer.appendChild(creditP);

    creators.forEach((person, index) => {
        let anchor = document.createElement("a");
        anchor.href = person.url;
        anchor.textContent = person.creator;
        anchor.target = "_blank";

        creditP.appendChild(anchor);

        if(index < creators.length - 1) {
            let splitText = document.createTextNode(' and ');
            creditP.appendChild(splitText);
        }
    })

    body.appendChild(footer);
    footer.append(logo, socialsContainer, creditsContainer);

}

export{renderFooter};
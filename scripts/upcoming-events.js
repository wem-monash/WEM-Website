const events = [
      {
        image: "../assets/images/WEM_UpcomingEventSample.jpg",
        alt: "Event 1",
        link: "https://example.com/event1",
        buttonText: "Buy Tickets"
      },
      {
        image: "../assets/images/logo.png",
        alt: "Event 2",
        link: "https://example.com/event2",
        buttonText: "Buy Tickets"
      },
      {
        image: "../assets/images/WEM_UpcomingEventSample.jpg",
        alt: "Event 3",
        link: "https://example.com/event3",
        buttonText: "Buy Tickets"
      }
    ];

    // GUIDELINES FOR ADDING EVENTS: 
    // to add new event, add to the above events array, using this format:
    /*
      { 
        image: "path/to/image.jpg",
        alt: "Event Description",
        link: "https://link-to-event-or-ticket.com",  
        buttonText: "Buy Tickets"
      }
    */ 

      // Happy Event Adding! :) :) (give Jena free tickets hehe)


    function renderUpcomingEvents() {
    
      const container = document.getElementById("upcomingEvents");
      container.innerHTML = ""; 


      // If there are no upcoming events,showing this message instead
      if (events.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No upcoming events at the moment. Please check back later.";
        message.style.textAlign = "center";
        message.style.color = "var(--text-secondary)";
        container.appendChild(message);
        return;
      }

      events.forEach(event => {
        const card = document.createElement("div");
        card.className = "upcoming-card";

        const img = document.createElement("img");
        img.src = event.image;
        img.alt = event.alt;
        img.className = "upcoming-card-img";

        const button = document.createElement("button");
        button.textContent = event.buttonText;
        button.onclick = () => window.open(event.link, "_blank"); // this opens link in new tab

        card.appendChild(img);
        card.appendChild(button);
        container.appendChild(card);
      });
    }



    document.addEventListener("DOMContentLoaded", () => {
  renderUpcomingEvents();
});
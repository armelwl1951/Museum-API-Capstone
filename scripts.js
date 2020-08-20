'use strict';

//search wizard
const apiKey = "api_key=JVtf3UDIYsedb3aRSbVFMARUZuhIG7il529eSO34";
const searchURL = "https://api.si.edu/openaccess/api/v1.0/search";

function formatQueryParams( params ) {
  const queryItems = Object.keys( params )
    .map( key => `${encodeURIComponent( key )}=${encodeURIComponent( params[ key] )}` )
  return queryItems.join( '&' );
}

function displayResults( responseJson ) {
  console.log( responseJson );
  for ( let i = 0; i < responseJson.data.length; i++ ) {
    $( '#results-list' ).append(
      ` <hr><li>
          <h3>${responseJson.data[i].fullName}</h3>
          <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
          <p><b>Address:</b> ${responseJson.data[i].addresses[0].line1} ${responseJson.data[i].addresses[0].line2} ${responseJson.data[i].addresses[0].line3}  ${responseJson.data[i].states}, ${responseJson.data[i].addresses[0].postalCode}</p>
          <p><b>Directions:</b> ${responseJson.data[i].directionsInfo}</p>
          <p><b>Description:</b> ${responseJson.data[i].description}</p>
        </li>
      `
    )};
  $( '#results' ).removeClass( 'hidden' );
}

function getResults( query, maxResults ) {
  const params = {
    userInput: query,
    limit: maxResults
  };

  const queryString = formatQueryParams( params );
  const url =  `${searchURL}?${queryString}&${apiKey}`;

  fetch(url)
    .then( response => {
      if ( response.ok ) {
        return response.json();
      }
      $( '#results-list' ).empty();
      throw new Error( 'Query not found.  Please try again.' );
    })
    .then( data => {
      console.log(data)

      $( '#results-list' ).empty();
      displayResults( data, maxResults );
      $( '.error-message' ).empty();
    })
    .catch( error => {
      $( '#js-error-message' ).text( `Something went wrong:  ${error.message}` );
      $( '#results-list' ).empty();
    });
}

function watchForm() {
  $( 'form' ).submit( event => {
    console.log('running watchForm')
    event.preventDefault();
    const searchTerm = $( '#js-search-term' ).val();
    const maxResults = $( '#js-max-results' ).val();
    getResults( searchTerm, maxResults );
  });
}

$( watchForm );

// header scrolling effect
$(window).on('scroll', function(){
	if($(window).scrollTop()){
      $('header').addClass('nav-show');
		  
	} 
	else{
		$('header').removeClass('nav-show');
	}
	   
})

//hamburgler
const navSlide = () => {
	 const hamburgler = document.querySelector(".hamburgler");
	 const navbar = document.querySelector(".nav-bar");
	 const navLinks = document.querySelectorAll(".nav-bar li");

     hamburgler.onclick = () => {
		
	 navbar.classList.toggle("nav-active");
		 
      //Animation links
	 navLinks.forEach((link, index) => {
		if (link.style.animation) {
			link.style.animation = "";
		} else {
			link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7+1}s`;
		   }
		});
	  //hamburgler animation
	 hamburgler.classList.toggle("toggle");
    }

    }
window.onload = () => navSlide();

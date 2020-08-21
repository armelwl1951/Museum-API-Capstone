'use strict';

//search wizard
const apiKey = "JVtf3UDIYsedb3aRSbVFMARUZuhIG7il529eSO34";
const searchURL = "https://api.si.edu/openaccess/api/v1.0/search";

function getResults( query, maxResults ) {
  const params = {
    userInput: query,
    limit: maxResults
  };

  const url = `${searchURL}?q=${query}&api_key=${apiKey}`;

  fetch(url)
    .then( response => {
      if ( response.ok ) {
        return response.json();
      }
      throw new Error("We couldn't find anything.  Please check your spelling and try again.");
      })
    .then( responseJson => {
      $('.error').empty();
      displayResults(responseJson);
    })
    .catch( error => {
      $( '#js-error-message' ).text( `Something went wrong:  ${error.message}` );
      $( '#results-list' ).empty();
    });
}

function displayResults( responseJson ) {
  console.log( responseJson );
  $('#results-list').empty();
  $('.restuls-img').html(`<img src="${response.message}" class="results-img">`);
  $('.results').removeClass('hidden');
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

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});

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

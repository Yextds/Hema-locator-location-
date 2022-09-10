import {
  formatMiOrKm,
  formatNumber,
  formatPhone,
  getValueFromPath,
} from "./utils";
import {
  parseTimeZoneUtcOffset,
  formatOpenNowString,
} from "./time";
import { i18n } from "../i18n";
import {
  base_url,
  limit,
  locationInput,
  locationNoun,
  locationNounPlural,
  locationOption,
  locationOptions,
  radius,
  savedFilterId,
  entityTypes,
  liveAPIKey,
} from "./constants";
import { languagedata, Multilang } from "./languagedata";
import { getRequest, startLoading, stopLoading } from "./loader";
import RtfConverter from "@yext/rtf-converter";
import { highlightLocation } from "./map";
// import $ from "jquery";
// import { twbsPagination } from "twbs-pagination";
export let currentLatitude = 0;
export let currentLongitude = 0;

export function locationJSONtoHTML(entityProfile, index, locationOptions) {
  let APIlanguage = entityProfile.meta.language
  
  const getValue = (opt: locationOption) => {
    let val = opt.value;

    if (opt.contentSource === "FIELD") {
      val = getValueFromPath(entityProfile, opt.value);

    }
    return opt.isRtf && !!val ? RtfConverter.toHTML(val) : val;
  };
 // Locator page Static data

 let title = '';
 let Store = '';
 let FilterBtn = '';
 let StoreTitle = '';
 let ViewMore = '';
 


  title += `<div>${Multilang.Allstore[APIlanguage]}</div>`;
  Store += `<li>${Multilang.Storelocator[APIlanguage]}</li>`
  StoreTitle += `${Multilang.StoreTitle[APIlanguage]}`
  ViewMore += `${Multilang.ViewMore[APIlanguage]}`
  
 
 
 $(".LocatorTitle").html(title);
 $(".Store-locator").html(Store);
 $(".Filter").html(FilterBtn);
 $(".StoreTitle").html(StoreTitle);
 $(".ViewMore").html(ViewMore);

 
  const cardTitleValue = getValue(locationOptions.cardTitle);
  const getDirectionsLabelValue = getValue(locationOptions.getDirectionsLabel);
  const viewDetailsLinkTextValue = getValue(
    locationOptions.viewDetailsLinkText
  );
  let cardTitleLinkUrlValue = getValue(locationOptions.cardTitleLinkUrl);
  const hoursValue = getValue(locationOptions.hours);
  const addressValue = getValue(locationOptions.address);
   const phone = getValue(locationOptions.phoneNumber);
   const phoneno = getValue(locationOptions.catringnumber);
   const brandsname= getValue(locationOptions.status);
  const phoneNumberValue = phone.toString();
  let viewDetailsLinkUrlValue = getValue(locationOptions.viewDetailsLinkUrl);

  let html =
    '<div class="lp-param-results lp-subparam-cardTitle lp-subparam-cardTitleLinkUrl">';
  if (cardTitleLinkUrlValue && cardTitleValue) {

    if (cardTitleLinkUrlValue["url"]) {
      cardTitleLinkUrlValue = cardTitleLinkUrlValue["url"];

    }
  }
  else if (cardTitleValue) {
  }
  html += "</div>";

 html += `<a class="storelocation-name details" href="/${cardTitleLinkUrlValue} "<h4 class="text-base capitalize font-semibold mb-3"> ${cardTitleValue}</a>` ;
 


  html += '<div class="address mb-4 relative pl-10 leading-8"><span class="icon flex h-8 w-8 absolute top-0 left-0"> <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75"></span> <span class="relative inline-flex rounded-full h-8 w-8 bg-orange items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="fill-white w-5 h-5"> <g data-name="Layer 2"> <path d="M16,30a1,1,0,0,0,.62-.22C17,29.44,27,21.38,27,13A11,11,0,0,0,5,13c0,8.38,10,16.44,10.38,16.78A1,1,0,0,0,16,30ZM7,13a9,9,0,0,1,18,0c0,6.3-6.87,12.81-9,14.69C13.87,25.81,7,19.3,7,13Z" /> <path d="M21,13a5,5,0,1,0-5,5A5,5,0,0,0,21,13Zm-8,0a3,3,0,1,1,3,3A3,3,0,0,1,13,13Z" /> </g> </svg> </span> </span>';
 
  html +=  addressValue.line1 + ', ' + addressValue.city + ', ' + addressValue.postalCode + ', ' + addressValue.countryCode + '<br>' + "</div>";


  html +='<div class="phone mb-2.5 pl-10 relative leading-8"><span class="icon flex h-8 w-8 absolute top-0 left-0"> <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75"></span> <span class="relative inline-flex rounded-full h-8 w-8 bg-orange items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="fill-white w-5 h-5"> <g data-name="Layer 2"> <path d="M27.308,20.649l-2.2-2.2a3.521,3.521,0,0,0-4.938-.021,2.152,2.152,0,0,1-2.729.267A15.026,15.026,0,0,1,13.3,14.562a2.181,2.181,0,0,1,.284-2.739A3.521,3.521,0,0,0,13.553,6.9l-2.2-2.2a3.514,3.514,0,0,0-4.961,0l-.633.634c-3.3,3.3-3.053,10.238,3.813,17.1,4.14,4.141,8.307,5.875,11.686,5.875a7.5,7.5,0,0,0,5.418-2.061l.634-.634A3.513,3.513,0,0,0,27.308,20.649ZM25.894,24.2l-.634.634c-2.6,2.6-8.339,2.125-14.276-3.813S4.571,9.34,7.171,6.74L7.8,6.107a1.511,1.511,0,0,1,2.133,0l2.2,2.2a1.511,1.511,0,0,1,.021,2.11,4.181,4.181,0,0,0-.531,5.239,17.01,17.01,0,0,0,4.713,4.706,4.179,4.179,0,0,0,5.231-.517,1.512,1.512,0,0,1,2.118.013l2.2,2.2A1.51,1.51,0,0,1,25.894,24.2Z" /> </g> </svg> </span> </span>' + phone + "</div>";
if(phoneno)
{
  html +='<div class="phone mb-2.5 pl-10 relative leading-8"><span class="icon flex h-8 w-8 absolute top-0 left-0"> <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75"></span> <span class="relative inline-flex rounded-full h-8 w-8 bg-orange items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="fill-white w-5 h-5"> <g data-name="Layer 2"> <path d="M27.308,20.649l-2.2-2.2a3.521,3.521,0,0,0-4.938-.021,2.152,2.152,0,0,1-2.729.267A15.026,15.026,0,0,1,13.3,14.562a2.181,2.181,0,0,1,.284-2.739A3.521,3.521,0,0,0,13.553,6.9l-2.2-2.2a3.514,3.514,0,0,0-4.961,0l-.633.634c-3.3,3.3-3.053,10.238,3.813,17.1,4.14,4.141,8.307,5.875,11.686,5.875a7.5,7.5,0,0,0,5.418-2.061l.634-.634A3.513,3.513,0,0,0,27.308,20.649ZM25.894,24.2l-.634.634c-2.6,2.6-8.339,2.125-14.276-3.813S4.571,9.34,7.171,6.74L7.8,6.107a1.511,1.511,0,0,1,2.133,0l2.2,2.2a1.511,1.511,0,0,1,.021,2.11,4.181,4.181,0,0,0-.531,5.239,17.01,17.01,0,0,0,4.713,4.706,4.179,4.179,0,0,0,5.231-.517,1.512,1.512,0,0,1,2.118.013l2.2,2.2A1.51,1.51,0,0,1,25.894,24.2Z" /> </g> </svg> </span> </span>' + phoneno + "</div>";
}

  
  if (hoursValue) {
    const offset = getValueFromPath(entityProfile, "timeZoneUtcOffset");
    const parsedOffset = parseTimeZoneUtcOffset(offset);
    html += '<div class="lp-param-results lp-subparam-hours">';
 html +=
      '<div class="open-now-string text-orange  cursor-pointer select-none" data-id="main-shop-'+index+'">'+'<span class= text-xl >'+
       formatOpenNowString(hoursValue, parsedOffset) + ''+'&#129175;'+'</span>'+ 
      "</div>"; 
 
 html += '<div class="storelocation-openCloseTime capitalize mt-2.5 bg-light_brown" style="display:none;" >';                        
 html += '<ul id="time-row-main-shop-'+index+'">';

  let dayConvert = ""
  dayConvert=languagedata[APIlanguage]
          
const days_string = [
   "sunday",
   "monday",
   "tuesday",
   "wednesday",
   "thursday",
   "friday",
   "saturday",
];
 
 const convertedDays = convertDays(days_string);

 let sort_array = [];
 $.each(convertedDays.afterSelected, function (indexh, convertedDay) {
   let daya = [ 
     convertedDay,hoursValue[convertedDay]
   ];

   sort_array.push(daya);

 });

 console.log(sort_array);

 $.each(sort_array, function (indexh, hour) {
   // console.log(indexh);

   function Convert(time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? Multilang.Am[APIlanguage] : Multilang.Pm[APIlanguage] ; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join(''); // return adjusted time or original string  
  }
   
   html+='<li class="grid grid-cols-2 lg:grid-cols-5 time-row leading-8 first:bg-orange first:text-white">' 
   html += '<div id="Getdata" class="lg:col-span-2 daydiv days_values font-normal px-2.5">';
   html += dayConvert[hour[0].toString()]+' ';
   html += '</div>';
     if(hour[1].openIntervals){
   
       $.each(hour[1].openIntervals, function (op, openInterval) {
         html += '<span class="lg:col-span-3 font-normal px-2.5" >'+Convert(openInterval.start)+" "+ Multilang.languages[APIlanguage]+" " +Convert(openInterval.end)+'</span>';
       });
     }else{
        html += '<span class="lg:col-span-3 font-normal px-2.5 text-red" >'+Multilang.Closelocation[APIlanguage]+'</span>'
     }       
   html+='</li>' 
 });
 
 html += '</ul>';                        
 // html += '</div>';
                   
    html += "</div>";
  }
  const singleLineAddress =
    entityProfile.name +
    " " +
    addressValue.line1 +
    " " +
    (addressValue.line2 ? addressValue.line2 + " " : "") +
    addressValue.city +
    " " +
    addressValue.region +
    " " +
    addressValue.postalCode;
    // html +='<div class="text-base mb-2 mt-2">' +'status:' + brandsname + "</div>";
      html += `<div class="flex flex-row flex-wrap  lp-param-results lp-subparam-getDirectionsLabel mt-5">      
                <a target="_blank" class="mx-1 sm:mx-1.5 transition-all duration-300 text-sm font-semibold bg-orange text-white py-2.5 px-2 sm:px-5 rounded-md"
                  href="https://www.google.com/maps/dir/?api=1&destination=${singleLineAddress}">
                  ${Multilang.Directiontext[APIlanguage]}
                </a>
                <a class="details mx-1  transition-all duration-300 text-sm font-semibold bg-orange text-white py-2.5 px-2 sm:px-5 rounded-md" href="/${cardTitleLinkUrlValue}">${Multilang.DetailPage[APIlanguage]}  </a>
            </div>`;
  html += '<div class="lp-param-results lp-subparam-availability mt-3">';
  html += "</div>";
  // Add center column
  html = `<div class="center-column">${html}</div>`;

  
   return `<div id="result-${index}" class="result border-b border-input_border border-opacity-40 hover:bg-light_brown list-group-item text-sm w-full relative px-5 py-2.5">${html}</div>`;
}
       
       function convertDays(days) {
      const currentDate = new Date();
      const dayNumber = currentDate.getDay();
      const currentSelectedDay = days[dayNumber];
      const beforeSelected = days.slice(0,dayNumber);
      const afterSelected = days.slice(dayNumber,days.length);
      beforeSelected.forEach((element)=>{
        afterSelected.push(element);
      });
      return {
        afterSelected:afterSelected
      };
    }
// Renders each location the the result-list-inner html
export function renderLocations(locations, append, viewMore) {
  if (!append) {
    [].slice
      .call(document.querySelectorAll(".result-list-inner") || [])
      .forEach(function (el) {
        el.innerHTML = "";
      });
  }

  // Done separately because the el.innerHTML call overwrites the original html.
  // Need to wait until all innerHTML is set before attaching listeners.
  locations.forEach((location, index) => {
    [].slice
      .call(document.querySelectorAll(".result-list-inner") || [])
      .forEach(function (el) {
        el.innerHTML += locationJSONtoHTML(location, index, locationOptions);
      });
  });

  locations.forEach((_, index) => {
    document
      .getElementById("result-" + index)
      .addEventListener("mouseover", () => {
        highlightLocation(index, false, false);
      });
    document.getElementById("result-" + index).addEventListener("click", () => {
      highlightLocation(index, false, true);
    });
  });

  if (viewMore) {
    [].slice
      .call(document.querySelectorAll(".result-list-inner") || [])
      .forEach(function (el) {
        el.innerHTML +=
          '<div><div class="btn btn-link btn-block">View More</div></div>';
      });
  }
}

function searchDetailMessageForCityAndRegion(total) {
  if (total === 0) {
    return '0 [locationType] found near <strong>"[city], [region]"</strong>';
  } else {
    return '[formattedVisible] of [formattedTotal] [locationType] near <strong>"[city], [region]"</strong>';
  }
}

function searchDetailMessageForArea(total) {
  if (total == 0) {
    return '0 [locationType] found near <strong>"[location]"</strong>';
  } else {
    return '[formattedVisible] of [formattedTotal] [locationType] near <strong>"[location]"</strong>';
  }
}

function searchDetailMessageNoGeo(total) {
  if (total === 0) {
    return "0 [locationType]";
  } else {
    return "[formattedVisible] of [formattedTotal] [locationType]";
  }
}

// Renders details of the search
export function renderSearchDetail(geo, visible, total, queryString) {
  // x of y locations near "New York, NY"
  // x  locations near "New York, NY"
  // x  locations near "New York, NY"

  let locationType = locationNoun;
  if (total === 0 || total > 1) {
    locationType = locationNounPlural;
  }

  let formattedVisible = formatNumber(visible);
  let formattedTotal = formatNumber(total);

  let searchDetailMessage;
  if (geo) {
    if (geo.address.city !== "") {
      searchDetailMessage = searchDetailMessageForCityAndRegion(total);
      searchDetailMessage = searchDetailMessage.replace(
        "[city]",
        geo.address.city
      );
      searchDetailMessage = searchDetailMessage.replace(
        "[region]",
        geo.address.region
      );

    } else {
      let location = "";
      if (geo.address.region) {
        location = geo.address.region;
      } else if (geo.address.country && queryString) {
        location = queryString;
      } else if (geo.address.country) {
        location = geo.address.country;
      }
      if (location !== "") {
        searchDetailMessage = searchDetailMessageForArea(total);
        searchDetailMessage = searchDetailMessage.replace(
          "[location]",
          location
        );
      }
    }
  } else {
    searchDetailMessage = searchDetailMessageNoGeo(total);
  }
  searchDetailMessage = searchDetailMessage.replace(
    "[locationType]",
    locationType
  );
  searchDetailMessage = searchDetailMessage.replace(
    "[formattedVisible]",
    formattedVisible
  );
  searchDetailMessage = searchDetailMessage.replace(
    "[formattedTotal]",
    formattedTotal
  );

  [].slice
    .call(document.querySelectorAll(".search-center") || [])
    .forEach(function (el) {
      el.innerHTML = "";
    });
  [].slice
    .call(document.querySelectorAll(".search-center") || [])
    .forEach(function (el) {
      el.innerHTML = searchDetailMessage;
    });
}
     

// find near location:-
export function getNearestLocationsByString() {
  const queryString = locationInput.value;
  if (queryString.trim() !== "") {

    // var request_url = base_url + "entities/geosearch";

    // request_url += "?radius=" + radius;
    // request_url += "&location=" + queryString
    let request_url =
      base_url +
      "entities" +
      "?limit=" +
      limit +
      "&languages="+
      langauage+
      '&sortBy=[{"name":"ASCENDING"}]';

    let filterParameters = {};
    let filterAnd = {};
    let filterOr = {};

    if (queryString) {

      filterOr = {
        "$or": [
           { "address.line1": { "$contains": queryString } },
           { "address.city": { "$contains": queryString } },
           { "address.region": { "$contains": queryString } },
           { "address.countryCode": { "$contains": queryString } },
           { "address.postalCode": { "$contains": queryString } },
          { "name": { "$contains": queryString } },
          { "mainPhone": { "$contains": queryString } }
        ]
      };

    }

    var ce_departments = [];
    $('.checkbox_departments').each(function () {
      if ($(this).is(":checked")) {
        ce_departments.push($(this).val());
      }
    });

    if (ce_departments.length > 0) {
      filterAnd = { "$and": [{ "c_departments": { "$in": ce_departments } }] };
    }

    filterParameters = { ...filterOr, ...filterAnd };
    var filterpar = JSON.stringify(filterParameters);
    var filter = encodeURI(filterpar);

    if (filter) {
      request_url += "&filter=" + filter;
    }

    // true value is for pagination remove when we search any single location or (location < 10)------
    getRequest(request_url, queryString);
  }
  var url = window.location.href;
  var myStorage = window.sessionStorage;
  sessionStorage.setItem('query', url);
  
}
function getNearestLatLng(position) {
  [].slice
    .call(document.querySelectorAll(".error-text") || [])
    .forEach(function (el) {
      el.textContent = "";
    });
  $('#offset').val(0);

  currentLatitude = position.coords.latitude;
  currentLongitude = position.coords.longitude;
  let request_url = base_url + "entities/geosearch";
  request_url += "?radius=" + radius;
  request_url +=
  "&location=" + currentLatitude + ", " + currentLongitude;
  request_url += "&limit=" + limit;
  getRequest(request_url, null);
}






// Gets a list of locations. Only renders if it's a complete list. This avoids a dumb looking map for accounts with a ton of locations.
//export let offset=0;

var ourURL = window.location.href;
var langauage = "";
if (ourURL.includes("/fr")) {
  langauage = "fr";
}
if (ourURL.includes("/de")) {
  langauage = "de";
}
else if (ourURL.includes("/nl")) {
  langauage = "nl";
}
else if(ourURL.includes("/en")){
  langauage = "en";
}

export function getLocations()
{
  let request_url =
    base_url +
    "entities" +
    "?limit=" +
    limit +
    "&languages=" +
    langauage +
    '&sortBy=[{"name":"ASCENDING"}]';

  let filterParameters = {};
  let filterAnd = {};
  let filterOr = {};

  const queryString = locationInput.value;

  if (queryString) {

    filterOr = {
      "$or": [
        { "address.line1": { "$eq": queryString } },
        { "address.city": { "$eq": queryString } },
        { "address.region": { "$eq": queryString } },
        { "address.countryCode": { "$eq": queryString } },
        { "address.postalCode": { "$eq": queryString } },
        { "name": { "$eq": queryString } }
      ]
    };
  }

  var ce_departments = [];
  $('.checkbox_departments').each(function () {
    if ($(this).is(":checked")) {
      ce_departments.push($(this).val());
    }
  });

  if (ce_departments.length > 0) {
    filterAnd = { "$and": [{ "c_company_services": { "$in": ce_departments } }] };

  }

  filterParameters = { ...filterOr, ...filterAnd };
  var filterpar = JSON.stringify(filterParameters);
  var filter = encodeURI(filterpar);

  if (filter) {
    request_url += "&filter=" + filter;
  }

  getRequest(request_url, null);

}
getLocations();
// filter CHECKBOX data:



document.getElementById("viewMoreBtn").addEventListener("click", function () {
  //let newOffset = offset + limit;
  //offset = newOffset;
  let offset = Number($('#offset').val());
  let newoffset = offset + limit;
  $('#offset').val(newoffset);
  getLocations()
});



export function getUsersLocation() {
  if (navigator.geolocation) { 
    const error = (error) => {
	
	[].slice
        .call(document.querySelectorAll(".error-text") || [])
        .forEach(function (el) {
          el.textContent = "";
        });
	
	//setCookie("user_latitude", "", 1);
    //setCookie("user_longitude", "", 1);
	// setCookie("user_share_location", "", 1);
	// $('#offset').val(0);	
	// getLocations();
	if(error.code == 1){
		[].slice
        .call(document.querySelectorAll(".error-text") || [])
        .forEach(function (el) {
          // el.textContent = error.message;
		  locationInput.value = '';
		  el.textContent = "Unable to determine your location. Please try entering a location in the search bar.";		  
        });	
				
	}else{
		[].slice
        .call(document.querySelectorAll(".error-text") || [])
        .forEach(function (el) {
		      locationInput.value = '';	
          el.textContent =
            "Unable to determine your location. Please try entering a location in the search bar.";			 
        });		
	}
		
    // stopLoading();	
    };
	
    navigator.geolocation.getCurrentPosition(getNearestLatLng, error, {
      timeout: 10000,
    });
  }
}




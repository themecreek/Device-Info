window.onload = function() {
 var options, render, body, country, result, domain;
      body = document.body;
  options = INSTALL_OPTIONS;
  render = function() {
    function applyBodyClasses() {
        		clearBodyClasses();

                            var currcC = '';
	if (options.browser)    currcC += decideBrowser(); 
        if (options.resolution) currcC += decideResolution(); 
        if (options.platform)   currcC += decidePlatform(); 
        if (options.language)   currcC += navigator.language + ' '; 
                                body.className += currcC;	
	}
        applyBodyClasses();               
        var js = document.createElement("script");
        js.type = "text/javascript";
        js.src = "http://www.geoplugin.net/javascript.gp"; 
        document.head.appendChild(js); 
        js.onload = function() {
         country = geoplugin_countryName();  
         result = country.toLowerCase().replace(/\s/g, '-'); 
        if (options.country)  body.className += result;  
        };
       
RegExp.quote = function(str) {
    return str.replace(/(?=[\\^$*+?.()|{}[\]])/g, "\\");
}; 
function extractDomain(url) {
    // find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }
    // find & remove port number
    domain = domain.split(':')[0];
    domain = domain.replace('www.', '');
    domain = domain.replace(/\./g, '_');

    return domain;
}
var our_domain = document.domain.replace('www.', '');
var our_ref = document.referrer;
if (our_ref.length > 0) {
    var reg_test = RegExp("((?:www\.)?(" + RegExp.quote(our_domain) + "))", "i");
    if (!reg_test.test(our_ref)) {
        // not our domain
        console.log('not our domain');
        // get the domain of the referer
        var ref_domain = extractDomain(our_ref);
        if (ref_domain.length > 0) {
            console.log(ref_domain);
           if (options.referrer)  body.className += ref_domain; 
        }
    }
    else {
        // same domain
        console.log('same domain');
    }
}                     
        function decidePlatform() {
		var cC = '';
		
		var platform = navigator.userAgent;
		if (platform.indexOf('Windows') > 0) { cC = 'windows' + ' '; }
		else if (platform.indexOf('Linux') > 0 && platform.indexOf('Android') < 0) { cC = 'linux' + ' '; }
		else if (platform.indexOf('Mac') > 0 && (platform.indexOf('iphone') < 0 || platform.indexOf('ipad') < 0)) { cC = 'mac' + ' '; }
		else if (platform.indexOf('iPhone') > 0) { cC = 'iphone' + ' '; }
		else if (platform.indexOf('iPad') > 0) { cC = 'ipad' + ' '; }
		else if (platform.indexOf('Android') > 0) { cC = 'android' + ' '; }

	return cC;
	}

        function decideBrowser() {
		var cC = '';	
		var nVer = navigator.appVersion;
		var nAgt = navigator.userAgent;
		var browserName  = navigator.appName;
		var fullVersion  = ''+parseFloat(navigator.appVersion); 
		var majorVersion = parseInt(navigator.appVersion,10);
		var nameOffset,verOffset,ix;

		if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
		 browserName = "opera";
		 fullVersion = nAgt.substring(verOffset+6);
		 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
		   fullVersion = nAgt.substring(verOffset+8);
		}
		else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
		 browserName = "msie";
		 fullVersion = nAgt.substring(verOffset+5);
		}
		else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
		 browserName = "chrome";
		 fullVersion = nAgt.substring(verOffset+7);
		}
		else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
		 browserName = "safari";
		 fullVersion = nAgt.substring(verOffset+7);
		 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
		   fullVersion = nAgt.substring(verOffset+8);
		}
		else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
		 browserName = "firefox";
		 fullVersion = nAgt.substring(verOffset+8);
		}
		else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ) 
		{
		 browserName = nAgt.substring(nameOffset,verOffset);
		 fullVersion = nAgt.substring(verOffset+1);
		 if (browserName.toLowerCase()==browserName.toUpperCase()) {
		  browserName = navigator.appName;
		 }
		}
		if ((ix=fullVersion.indexOf(";"))!=-1) fullVersion=fullVersion.substring(0,ix);
		if ((ix=fullVersion.indexOf(" "))!=-1) fullVersion=fullVersion.substring(0,ix);

		majorVersion = parseInt(''+fullVersion,10);
		if (isNaN(majorVersion)) {
		 fullVersion  = ''+parseFloat(navigator.appVersion); 
		 majorVersion = parseInt(navigator.appVersion,10);
		}
		
		cC += browserName + ' '; 
		cC += browserName+majorVersion + ' ';
		
		return cC;
	}; 
        function decideResolution() {
                var h = window.innerHeight;
                var w = window.innerWidth;
		var cC = '';
		
		if (w >= 1880) { cC = 'w1920' + ' '; }
		else if (w >= 1560) { cC = 'w1600' + ' '; }
		else if (w >= 1400) { cC = 'w1440' + ' '; }
		else if (w >= 1240) { cC = 'w1280' + ' '; }
		else if (w >= 984) { cC = 'w1024' + ' '; }
		else if (w >= 728) { cC = 'w768' + ' '; }
		else if (w >= 440) { cC = 'w480' + ' '; }
		else if (w >= 280) { cC = 'w320' + ' '; }
		else { cC = 'wtiny' + ' '; }

		if (h >= 864) { cC += 'h1024' + ' '; }
		else if (h >= 740) { cC += 'h900' + ' '; }
		else if (h >= 608) { cC += 'h768' + ' '; }
		else if (h >= 440) { cC += 'h600' + ' '; }
		else if (h >= 320) { cC += 'h480' + ' '; }
		else { cC += 'htiny' + ' '; }

		return cC;
	} 
   
        function clearBodyClasses() {
		body.classList.remove("w1920", "w1600", "w1440", "w1280", "w1024", "w768", "w480", "w320", "wtiny", "h1024", "h900", "h768", "h600", "h480", "htiny");
	}
   
  };
  render();

 
  INSTALL_SCOPE = {
      setOptions: function(opts) {
      options = opts;
      render();
    }
  };
};

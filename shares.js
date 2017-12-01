let shareLinksBaseUrl = {
  facebook: 'https://www.facebook.com/sharer/sharer.php',
  twitter: 'https://twitter.com/share',
  reddit: 'https://www.reddit.com/submit',
  telegram: 'https://telegram.me/share/',
  googleplus: 'https://plus.google.com/share',
  linkedin: 'https://linkedin.com/shareArticle',
  messenger: 'fb-messenger://share',
  viber: 'viber://forward',
  email: 'mailto:',
}

let source = {
  facebook: "facebook",
  twitter: "twitter",
  reddit: "reddit",
  telegram: "telegram",
  googleplus: "googleplus",
  linkedin: "linkedin",
  messenger: "messenger",
  viber: "viber",
  email: "email",
}

var media = {};

rapplerCreateSharebar = function (props) {
  /** Required props:
   *  title
   *  url
   *  container
   *  orientation
   *  providers
   */

  media = {};

  if (!props.providers || props.providers.length === 0) {
    props.providers = ['facebook', 'twitter']
  }

  if (!props.orientation)
    props.orientation = 'horizontal';

  generateAttributes(props);
  appendShareButton(props);
}

generateAttributes = function (props) {
  // Generate the attributes required per social media

  props.providers.forEach(function (provider) {
    if (provider === source.facebook) {
      media[provider] = {
        u: props.url
      }
    } else if (provider === source.twitter) {
      media[provider] = {
        url: props.url,
        text: props.title,
        via: props.via
      }
    } else if (provider === source.reddit) {
      media[provider] = {
        url: props.url,
        text: props.title
      }
    } else if (provider === source.googleplus) {
      media[provider] = {
        url: props.url
      }
    } else if (provider === source.email) {
      media[provider] = {
        subject: props.title,
        body: props.url
      }
    } else if (provider === source.linkedin) {
      media[provider] = {
        url: props.url,
        title: props.title
      }
    }
  });
  return;
}

appendShareButton = function (props) {
  for (var provider in media) {
    if (media.hasOwnProperty(provider)) {
      if (validateParams(provider, media[provider]).isValid) {
        // Generate the queryparameter per social media
        var queryParams = objectToGetParams(media[provider]);
        // Generate the social media share URL together with queryparams
        var url = shareLinksBaseUrl[provider] + queryParams;
        // Add Share Buttons to specified div id
        var _provider = provider === 'googleplus' ? 'google-plus' : provider;
        $('#' + props.container).append(`
          <span class="fa-stack fa-lg ` + props.orientation + `" onClick="openLink('` + url + `')" >
            <i class="fa fa-circle fa-stack-2x ` + _provider + `"></i>
            <i class="fa fa-` + _provider + ` fa-inverse fa-stack-1x" aria-hidden="true"></i>
          </span> `);
      } else {
        console.log("Something went wrong with Social Sharing. Please contact administrator");
      }
    }
  }

  addcssrule();

}

objectToGetParams = function (object) {
  return '?' + Object.keys(object).filter(function (key) {
    return !!object[key];
  }).map(function (key) {
    return key + '=' + encodeURIComponent(object[key]);
  }).join('&');
}

validateParams = function (src, val) {
  // Validating the required fields for sharing
  if (src == source.facebook) {
    if (!val.u)
      return { isValid: false, message: 'URL is required' }
    else
      return { isValid: true }
  } else if (src == source.email) {
    if (!val.subject)
      return { isValid: false, message: 'Subject is required' }
    else if (!val.body)
      return { isValid: false, message: 'Body is required' }
    else
      return { isValid: true }
  } else {
    if (!val.url)
      return { isValid: false, message: 'URL is required' }
    else
      return { isValid: true }
  }
}

openLink = function (url) {
  let height = 400,
    width = 550;

  const left = (window.outerWidth / 2)
    + (window.screenX || window.screenLeft || 0) - (width / 2);
  const top = (window.outerHeight / 2)
    + (window.screenY || window.screenTop || 0) - (height / 2);

  const config = {
    height,
    width,
    left,
    top,
    location: 'no',
    toolbar: 'no',
    status: 'no',
    directories: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    resizable: 'no',
    centerscreen: 'yes',
    chrome: 'yes',
  };

  const shareDialog = window.open(
    url,
    '',
    Object.keys(config).map(key => `${key}=${config[key]}`).join(', ')
  );

  return shareDialog;
}

addcssrule = function () {
  var cssrules = $("<style type='text/css'> </style>").appendTo("head");

  cssrules.append(".vertical { display:block; }");
  cssrules.append(".horizontal { display:inline-block; }");

}
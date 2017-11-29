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

function SocialSharing() {
  this.props = {};
}

SocialSharing.prototype.createShareBar = function (props) {
  /** Required props:
   *  title
   *  url
   *  container
   *  orientation
   *  providers
   */

  this.props = props;
  this.media = {};

  if (!props.providers || props.providers.length === 0) {
    this.props.providers = ['facebook', 'twitter', 'reddit', 'googleplus', 'linkedin', 'email']
  }

  this.generateAttributes();
  this.appendShareButton();
}

SocialSharing.prototype.generateAttributes = function () {
  // Generate the attributes required per social media
  var self = this;
  this.props.providers.forEach(function (provider) {
    if (provider === source.facebook) {
      self.media[provider] = {
        u: self.props.url
      }
    } else if (provider === source.twitter) {
      self.media[provider] = {
        url: self.props.url,
        text: self.props.title
      }
    } else if (provider === source.reddit) {
      self.media[provider] = {
        url: self.props.url,
        text: self.props.title
      }
    } else if (provider === source.googleplus) {
      self.media[provider] = {
        url: self.props.url
      }
    } else if (provider === source.email) {
      self.media[provider] = {
        subject: self.props.title,
        body: self.props.url
      }
    } else if (provider === source.linkedin) {
      self.media[provider] = {
        url: self.props.url,
        title: self.props.title
      }
    }
  });
  return;
}

SocialSharing.prototype.appendShareButton = function () {
  var self = this;
  for (var provider in this.media) {
    if (this.media.hasOwnProperty(provider)) {
      if (self.validateParams(provider, this.media[provider]).isValid) {
        // Generate the queryparameter per social media
        var queryParams = self.objectToGetParams(this.media[provider]);
        // Generate the social media share URL together with queryparams
        var url = shareLinksBaseUrl[provider] + queryParams;
        // Add Share Buttons to specified div id
        var _provider = provider === 'googleplus' ? 'google-plus' : provider;
        $(self.props.container).append(`
          <span class="fa-stack fa-lg" onClick="openLink('` + url + `')" >
            <i class="fa fa-circle fa-stack-2x ` + _provider + `"></i>
            <i class="fa fa-` + _provider + ` fa-inverse fa-stack-1x" aria-hidden="true"></i>
          </span> `);
      } else {
        console.log("Something went wrong with Social Sharing. Please contact administrator");
      }
    }
  }
}

SocialSharing.prototype.objectToGetParams = function (object) {
  return '?' + Object.keys(object).filter(function (key) {
    return !!object[key];
  }).map(function (key) {
    return key + '=' + encodeURIComponent(object[key]);
  }).join('&');
}

SocialSharing.prototype.validateParams = function (src, val) {
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
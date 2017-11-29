# social-media-sharejs
Client-side JavaScript that creates social media share buttons

## Usage
* Import the js file:
```
<script src="shares.js"></script>
```
* This relies on jQuery to add buttons into the DOM
```
<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
    crossorigin="anonymous"></script>
```
* In your script, create a new instance of SocialSharing()
```
var sharing = new SocialSharing();
```
* Then call createShareBar to generate buttons
```
sharing.createShareBar({
      title: 'Hello Title',
      url: 'http://facebook.com',
      container: '#share-bar',
      orientation: 'vertical'
    })
```

Here's the complete html code:
```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>

</head>

<body>
  <div id="share-bar"></div>
  <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
    crossorigin="anonymous"></script>
  <script src="shares.js"></script>
  <script>
    var sharing = new SocialSharing();
    sharing.createShareBar({
      title: 'Hello Title',
      url: 'http://facebook.com',
      container: '#share-bar',
      orientation: 'vertical'
    })
  </script>

</body>

</html>
```

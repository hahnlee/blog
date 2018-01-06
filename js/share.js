var url = document.URL;

var facebook = document.getElementById("share-link-facebook");
var twitter = document.getElementById("share-link-twitter");

facebook.href = "https://www.facebook.com/sharer.php?u=" + url;
twitter.href = "https://twitter.com/intent/tweet?url=" + url;

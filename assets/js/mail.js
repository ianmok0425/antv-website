function sendmail(form) {
    console.log("sending mail")
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    var mailToLink = "mailto:info@antvcoin.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);
    window.location.href = mailToLink;
}
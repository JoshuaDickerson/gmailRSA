gmailRSA
========

A chrome extension for the RSA encryption of form elements on the fly.



gmailRSA injects javascript into the active tab, which searches for a string in the following form:

@RSAME=[{"addressee"}<"message contents">]=ENDRSA

Once found, the extension grabs the public key of the adressee from a web-api, and encrypts the message contents for that person,
and replaces the existing page contents with the encrypted version. More delimiters are added to notify the recipient
(and client extenstion) of existence of the encrypted message.
The contents of the message are sent over whichever communications channel (AIM, GMAIL, GChat),
where it can be decrypted by the reverse of the above described process.

The only problem is the secure storage of the private key on the local host machine. 





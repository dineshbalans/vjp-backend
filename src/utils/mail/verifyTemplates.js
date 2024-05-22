const verifyRequest = (activationLink, fName, lName) => {
  return `
    <!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"/><!--<![endif]-->
<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		@media (max-width:640px) {
			.desktop_hide table.icons-outer {
				display: inline-table !important;
			}

			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.image_block div.fullWidth {
				max-width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}

			.reverse {
				display: table;
				width: 100%;
			}

			.reverse .column.last {
				display: table-header-group !important;
			}

			.row-4 td.column.last .border {
				padding: 25px 20px 20px;
				border-top: 0;
				border-right: 0px;
				border-bottom: 0;
				border-left: 0;
			}

			.row-3 .column-1 .block-1.spacer_block {
				height: 40px !important;
			}

			.row-1 .column-1 {
				padding: 20px 20px 5px !important;
			}

			.row-1 .column-3 {
				padding: 5px 20px 25px !important;
			}
		}
	</style>
</head>
<body style="background-color: #e6e6e6; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e6e6e6;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 620px; margin: 0 auto;" width="620">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 20px; padding-right: 20px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="25%">
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
<tr>
<td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; font-weight: 400; text-align: center;">
<table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
<tr>
<td style="vertical-align: middle; text-align: center; padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;">
<div>
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="300.000000pt" height="66.000000pt" viewBox="0 0 300.000000 66.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.10, written by Peter Selinger 2001-2011
</metadata>
<g transform="translate(0.000000,66.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M92 642 l-24 -19 39 -91 39 -91 43 87 43 87 -34 -32 c-19 -18 -39
-33 -45 -33 -6 0 -17 25 -23 55 -6 30 -12 55 -13 55 -1 0 -13 -9 -25 -18z"/>
<path d="M420 453 c1 -37 53 -200 66 -210 44 -32 62 -11 94 111 l27 106 -23 0
c-18 0 -25 -7 -30 -27 -3 -16 -10 -44 -14 -63 -4 -19 -11 -47 -14 -62 -11 -48
-23 -31 -42 62 -16 82 -20 90 -41 90 -13 0 -23 -3 -23 -7z"/>
<path d="M630 440 c0 -17 7 -20 40 -20 l40 0 0 -57 c0 -77 -8 -87 -58 -79 -47
7 -63 -7 -38 -32 10 -11 32 -16 58 -16 64 2 78 26 78 135 l0 89 -60 0 c-53 0
-60 -2 -60 -20z"/>
<path d="M785 350 c0 -107 1 -110 23 -110 18 0 22 6 22 30 0 27 3 30 34 30 50
0 86 33 86 79 0 57 -31 81 -106 81 l-59 0 0 -110z m113 58 c29 -29 2 -68 -47
-68 -18 0 -21 6 -21 40 0 37 2 40 28 40 15 0 33 -5 40 -12z"/>
<path d="M1080 350 l0 -110 75 0 c68 0 75 2 75 20 0 18 -7 20 -55 20 -52 0
-55 1 -55 25 0 23 3 25 50 25 43 0 50 3 50 20 0 17 -7 20 -50 20 -47 0 -50 2
-50 25 0 24 3 25 55 25 48 0 55 2 55 20 0 18 -7 20 -75 20 l-75 0 0 -110z"/>
<path d="M1260 350 l0 -110 25 0 25 0 -6 82 c-8 94 6 100 25 11 19 -83 26 -93
66 -93 l35 0 0 110 c0 103 -1 110 -20 110 -18 0 -20 -7 -20 -82 -1 -89 -9 -89
-30 0 -14 63 -31 82 -71 82 l-29 0 0 -110z"/>
<path d="M1450 440 c0 -16 7 -20 30 -20 l30 0 0 -90 c0 -87 1 -90 23 -90 21 0
22 2 19 90 l-3 90 29 0 c21 0 31 6 35 20 5 19 0 20 -79 20 -77 0 -84 -2 -84
-20z"/>
<path d="M1635 350 l0 -110 75 0 c69 0 76 2 76 20 0 17 -7 20 -53 20 -50 0
-53 1 -53 25 0 23 4 25 45 25 38 0 45 3 45 20 0 17 -7 20 -45 20 -41 0 -45 2
-45 25 0 24 3 25 53 25 46 0 53 3 53 20 0 18 -7 20 -76 20 l-75 0 0 -110z"/>
<path d="M1820 350 c0 -103 1 -110 20 -110 17 0 20 7 20 42 l0 42 31 -42 c24
-33 37 -42 61 -42 l30 0 -32 37 c-30 34 -31 37 -14 46 27 15 34 28 34 65 0 50
-29 72 -95 72 l-55 0 0 -110z m105 40 c0 -21 -5 -26 -32 -28 -31 -3 -33 -1
-33 28 0 29 2 31 33 28 27 -2 32 -7 32 -28z"/>
<path d="M2010 350 c0 -103 1 -110 20 -110 16 0 20 7 20 30 0 27 3 30 34 30
51 0 86 33 86 81 0 59 -26 79 -100 79 l-60 0 0 -110z m108 58 c29 -29 2 -68
-47 -68 -18 0 -21 6 -21 40 0 37 2 40 28 40 15 0 33 -5 40 -12z"/>
<path d="M2198 350 c-3 -108 -3 -110 20 -110 19 0 22 5 22 42 l0 42 31 -42
c21 -29 38 -42 55 -42 30 0 30 5 -1 42 l-25 30 25 20 c18 14 25 29 25 54 0 52
-28 74 -94 74 l-55 0 -3 -110z m107 40 c0 -21 -5 -26 -32 -28 -31 -3 -33 -1
-33 28 0 29 2 31 33 28 27 -2 32 -7 32 -28z"/>
<path d="M2385 350 c0 -107 1 -110 23 -110 21 0 22 3 22 110 0 107 -1 110 -22
110 -22 0 -23 -3 -23 -110z"/>
<path d="M2480 440 c-25 -25 -26 -72 -2 -93 9 -8 35 -17 57 -19 32 -2 40 -7
40 -23 0 -17 -8 -20 -57 -23 -50 -3 -58 -6 -58 -22 0 -18 7 -20 63 -20 71 0
97 17 97 61 0 40 -23 62 -71 68 -35 5 -44 10 -44 26 0 17 8 21 55 25 43 4 55
9 56 23 3 27 -108 25 -136 -3z"/>
<path d="M2650 350 l0 -110 75 0 c68 0 75 2 75 20 0 18 -7 20 -55 20 -52 0
-55 1 -55 25 0 23 3 25 50 25 43 0 50 3 50 20 0 17 -7 20 -50 20 -47 0 -50 2
-50 25 0 24 3 25 55 25 48 0 55 2 55 20 0 18 -7 20 -75 20 l-75 0 0 -110z"/>
<path d="M2852 444 c-27 -19 -30 -74 -4 -97 9 -8 35 -17 57 -19 32 -2 40 -7
40 -23 0 -17 -8 -21 -60 -25 -48 -4 -60 -9 -61 -22 -2 -16 8 -18 67 -18 59 0
70 3 83 22 36 51 11 98 -55 107 -35 5 -44 10 -44 26 0 17 8 20 53 23 44 3 52
6 52 23 0 16 -7 19 -53 19 -31 0 -61 -6 -75 -16z"/>
<path d="M110 245 c0 -154 -1 -166 -21 -186 -16 -16 -28 -20 -55 -14 -29 5
-34 3 -34 -14 0 -16 9 -21 43 -26 53 -8 95 7 107 40 6 15 10 103 10 196 l0
169 -25 0 -25 0 0 -165z"/>
<path d="M236 363 c20 -56 17 -94 -11 -148 -13 -27 -22 -51 -20 -54 3 -2 21
11 40 29 41 40 70 108 61 145 -8 33 -41 65 -65 65 -17 0 -18 -3 -5 -37z"/>
</g>
</svg>
</div>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 20px; padding-right: 20px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
<table border="0" cellpadding="0" cellspacing="0" class="empty_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div></div>
</td>
</tr>
</table>
</td>
<td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 20px; padding-right: 20px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="25%">
<table border="0" cellpadding="0" cellspacing="0" class="social_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:5px;padding-right:5px;text-align:center;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;" width="72px">
<tr>
<td style="padding:0 2px 0 2px;"><a href="https://www.facebook.com/" target="_blank"><img alt="facebook" height="auto" src="images/facebook2x.png" style="display: block; height: auto; border: 0;" title="facebook" width="32"/></a></td>
<td style="padding:0 2px 0 2px;"><a href="https://www.instagram.com/" target="_blank"><img alt="instagram" height="auto" src="images/instagram2x.png" style="display: block; height: auto; border: 0;" title="instagram" width="32"/></a></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 620px; margin: 0 auto;" width="620">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 40px; padding-left: 20px; padding-right: 20px; padding-top: 40px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-top:10px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #393d47; direction: ltr; font-family: 'Playfair Display', Georgia, serif; font-size: 38px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;"><span class="tinyMce-placeholder">Confirm Your Email! </span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment" style="line-height:10px">
<div class="fullWidth" style="max-width: 261px;"><img alt="Confirm subscription" height="auto" src="images/confirm.png" style="display: block; height: auto; border: 0; width: 100%;" title="Confirm subscription" width="261"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-top:20px;">
<div style="color:#393d47;direction:ltr;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
<p style="margin: 0; margin-bottom: 16px;">Hi ${fName + " " + lName},</p>
<p style="margin: 0;">We're excited to have you on board! You're almost set to start enjoying VJP Enterprises. Simply click the link below to verify your email address and get started. The link expires in 60 minutes.</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-top:10px;text-align:center;">
<div align="center" class="alignment"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://example.com" style="height:48px;width:111px;v-text-anchor:middle;" arcsize="0%" strokeweight="0.75pt" strokecolor="#4D4997" fillcolor="#4d4997">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px">
<![endif]--><a href=${activationLink} style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#4d4997;border-radius:0px;width:auto;border-top:1px solid #4D4997;font-weight:400;border-right:1px solid #4D4997;border-bottom:1px solid #4D4997;border-left:1px solid #4D4997;padding-top:5px;padding-bottom:5px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">Confirm</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #eeeeee; border-left: 20px solid #FFFFFF; border-radius: 0; border-right: 20px solid #FFFFFF; color: #000000; width: 620px; margin: 0 auto;" width="620">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 620px; margin: 0 auto;" width="620">
<tbody>
<tr class="reverse">
<td class="column column-1 last" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; padding-left: 20px; padding-right: 20px; padding-top: 25px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<div class="border">
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
<tr>
<td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 15px; font-weight: 400; text-align: center;">
<table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
<tr>
<td style="vertical-align: middle; text-align: center; padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"><img align="center" class="icon" height="auto" src="images/vjp_logo_color.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="217"/></td>
</tr>
</table>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-top:15px;">
<div style="font-family: sans-serif">
<div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
<p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><span style="font-size:14px;">2023 © All rights reserved</span></p>
</div>
</div>
</td>
</tr>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table><!-- End -->
</body>
</html>`;
};

const verifyedSuccess = (activationLink, fName, lName) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet">
	<style>
	  body { margin: 0; padding: 0; background-color: #e6e6e6; -webkit-text-size-adjust: none; text-size-adjust: none; }
	  table { border-spacing: 0; border-collapse: collapse; }
	  .row-content { width: 100%; max-width: 620px; margin: 0 auto; background-color: #ffffff; }
	  .column { padding: 20px; vertical-align: top; }
	  .social-table img { width: 32px; height: auto; }
	  h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 38px; color: #393d47; text-align: center; }
	  p { font-family: Montserrat, sans-serif; font-size: 16px; line-height: 150%; color: #393d47; }
	  .button { display: inline-block; padding: 10px 20px; font-family: Montserrat, sans-serif; font-size: 16px; color: #ffffff; background-color: #4d4997; text-decoration: none; border: 1px solid #4d4997; }
	</style>
  </head>
  <body>
	<table class="nl-container" width="100%">
	  <tr>
		<td>
		  <table class="row row-1">
			<tr>
			  <td class="row-content">
				<table width="100%">
				  <tr>
					<td class="column" width="25%">
					  <table width="100%" class="icons-outer">
						<tr>
						  <td style="text-align: center;">
							<svg xmlns="http://www.w3.org/2000/svg" width="300" height="66" viewBox="0 0 300 66" fill="#000">
							  <!-- SVG content here -->
							  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="300.000000pt" height="66.000000pt" viewBox="0 0 300.000000 66.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.10, written by Peter Selinger 2001-2011
</metadata>
<g transform="translate(0.000000,66.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M92 642 l-24 -19 39 -91 39 -91 43 87 43 87 -34 -32 c-19 -18 -39
-33 -45 -33 -6 0 -17 25 -23 55 -6 30 -12 55 -13 55 -1 0 -13 -9 -25 -18z"/>
<path d="M420 453 c1 -37 53 -200 66 -210 44 -32 62 -11 94 111 l27 106 -23 0
c-18 0 -25 -7 -30 -27 -3 -16 -10 -44 -14 -63 -4 -19 -11 -47 -14 -62 -11 -48
-23 -31 -42 62 -16 82 -20 90 -41 90 -13 0 -23 -3 -23 -7z"/>
<path d="M630 440 c0 -17 7 -20 40 -20 l40 0 0 -57 c0 -77 -8 -87 -58 -79 -47
7 -63 -7 -38 -32 10 -11 32 -16 58 -16 64 2 78 26 78 135 l0 89 -60 0 c-53 0
-60 -2 -60 -20z"/>
<path d="M785 350 c0 -107 1 -110 23 -110 18 0 22 6 22 30 0 27 3 30 34 30 50
0 86 33 86 79 0 57 -31 81 -106 81 l-59 0 0 -110z m113 58 c29 -29 2 -68 -47
-68 -18 0 -21 6 -21 40 0 37 2 40 28 40 15 0 33 -5 40 -12z"/>
<path d="M1080 350 l0 -110 75 0 c68 0 75 2 75 20 0 18 -7 20 -55 20 -52 0
-55 1 -55 25 0 23 3 25 50 25 43 0 50 3 50 20 0 17 -7 20 -50 20 -47 0 -50 2
-50 25 0 24 3 25 55 25 48 0 55 2 55 20 0 18 -7 20 -75 20 l-75 0 0 -110z"/>
<path d="M1260 350 l0 -110 25 0 25 0 -6 82 c-8 94 6 100 25 11 19 -83 26 -93
66 -93 l35 0 0 110 c0 103 -1 110 -20 110 -18 0 -20 -7 -20 -82 -1 -89 -9 -89
-30 0 -14 63 -31 82 -71 82 l-29 0 0 -110z"/>
<path d="M1450 440 c0 -16 7 -20 30 -20 l30 0 0 -90 c0 -87 1 -90 23 -90 21 0
22 2 19 90 l-3 90 29 0 c21 0 31 6 35 20 5 19 0 20 -79 20 -77 0 -84 -2 -84
-20z"/>
<path d="M1635 350 l0 -110 75 0 c69 0 76 2 76 20 0 17 -7 20 -53 20 -50 0
-53 1 -53 25 0 23 4 25 45 25 38 0 45 3 45 20 0 17 -7 20 -45 20 -41 0 -45 2
-45 25 0 24 3 25 53 25 46 0 53 3 53 20 0 18 -7 20 -76 20 l-75 0 0 -110z"/>
<path d="M1820 350 c0 -103 1 -110 20 -110 17 0 20 7 20 42 l0 42 31 -42 c24
-33 37 -42 61 -42 l30 0 -32 37 c-30 34 -31 37 -14 46 27 15 34 28 34 65 0 50
-29 72 -95 72 l-55 0 0 -110z m105 40 c0 -21 -5 -26 -32 -28 -31 -3 -33 -1
-33 28 0 29 2 31 33 28 27 -2 32 -7 32 -28z"/>
<path d="M2010 350 c0 -103 1 -110 20 -110 16 0 20 7 20 30 0 27 3 30 34 30
51 0 86 33 86 81 0 59 -26 79 -100 79 l-60 0 0 -110z m108 58 c29 -29 2 -68
-47 -68 -18 0 -21 6 -21 40 0 37 2 40 28 40 15 0 33 -5 40 -12z"/>
<path d="M2198 350 c-3 -108 -3 -110 20 -110 19 0 22 5 22 42 l0 42 31 -42
c21 -29 38 -42 55 -42 30 0 30 5 -1 42 l-25 30 25 20 c18 14 25 29 25 54 0 52
-28 74 -94 74 l-55 0 -3 -110z m107 40 c0 -21 -5 -26 -32 -28 -31 -3 -33 -1
-33 28 0 29 2 31 33 28 27 -2 32 -7 32 -28z"/>
<path d="M2385 350 c0 -107 1 -110 23 -110 21 0 22 3 22 110 0 107 -1 110 -22
110 -22 0 -23 -3 -23 -110z"/>
<path d="M2480 440 c-25 -25 -26 -72 -2 -93 9 -8 35 -17 57 -19 32 -2 40 -7
40 -23 0 -17 -8 -20 -57 -23 -50 -3 -58 -6 -58 -22 0 -18 7 -20 63 -20 71 0
97 17 97 61 0 40 -23 62 -71 68 -35 5 -44 10 -44 26 0 17 8 21 55 25 43 4 55
9 56 23 3 27 -108 25 -136 -3z"/>
<path d="M2650 350 l0 -110 75 0 c68 0 75 2 75 20 0 18 -7 20 -55 20 -52 0
-55 1 -55 25 0 23 3 25 50 25 43 0 50 3 50 20 0 17 -7 20 -50 20 -47 0 -50 2
-50 25 0 24 3 25 55 25 48 0 55 2 55 20 0 18 -7 20 -75 20 l-75 0 0 -110z"/>
<path d="M2852 444 c-27 -19 -30 -74 -4 -97 9 -8 35 -17 57 -19 32 -2 40 -7
40 -23 0 -17 -8 -21 -60 -25 -48 -4 -60 -9 -61 -22 -2 -16 8 -18 67 -18 59 0
70 3 83 22 36 51 11 98 -55 107 -35 5 -44 10 -44 26 0 17 8 20 53 23 44 3 52
6 52 23 0 16 -7 19 -53 19 -31 0 -61 -6 -75 -16z"/>
<path d="M110 245 c0 -154 -1 -166 -21 -186 -16 -16 -28 -20 -55 -14 -29 5
-34 3 -34 -14 0 -16 9 -21 43 -26 53 -8 95 7 107 40 6 15 10 103 10 196 l0
169 -25 0 -25 0 0 -165z"/>
<path d="M236 363 c20 -56 17 -94 -11 -148 -13 -27 -22 -51 -20 -54 3 -2 21
11 40 29 41 40 70 108 61 145 -8 33 -41 65 -65 65 -17 0 -18 -3 -5 -37z"/>
</g>
</svg>
							</svg>
						  </td>
						</tr>
					  </table>
					</td>
					<td class="column" width="50%"></td>
					<td class="column" width="25%">
					  <table class="social-table" align="center">
						<tr>
						  <td><a href="https://www.facebook.com/" target="_blank"><img src="https://www.bing.com/images/search?view=detailV2&ccid=55DCXbXl&id=7AA948779DB9B3579FC9288CC17A118B5F8B5BB9&thid=OIP.55DCXbXlKDgEBoZhKxpzLAHaHa&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.e790c25db5e52838040686612b1a732c%3frik%3duVuLX4sResGMKA%26riu%3dhttp%253a%252f%252fpngimg.com%252fuploads%252ffacebook_logos%252ffacebook_logos_PNG19757.png%26ehk%3dJL234rPBfx%252bf3tobhEVbPdNgJiWOhk251WyRwRAg940%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=2000&expw=2000&q=facebook+img&simid=607997671435492870&FORM=IRPRST&ck=93AAE48B0F9BD4F168E7BB1529C93150&selectedIndex=0&itb=1&ajaxhist=0&ajaxserp=0" alt="facebook"></a></td>
						  <td><a href="https://www.instagram.com/" target="_blank"><img src="/html/validateUser/images/facebook2x.png" alt="instagram"></a></td>
						</tr>
					  </table>
					</td>
				  </tr>
				</table>
			  </td>
			</tr>
		  </table>
		  <table class="row row-2">
			<tr>
			  <td class="row-content">
				<table width="100%">
				  <tr>
					<td class="column">
					  <h1>Confirm Your Email!</h1>
					</td>
				  </tr>
				  <tr>
					<td class="column" align="center">
					  <img src="images/confirm.png" alt="Confirm subscription" style="max-width: 261px;">
					</td>
				  </tr>
				  <tr>
					<td class="column">
					  <p>Hi ${fName} ${lName},</p>
					  <p>We're excited to have you on board! You're almost set to start enjoying VJP Enterprises. Simply click the link below to verify your email address and get started. The link expires in 60 minutes.</p>
					</td>
				  </tr>
				  <tr>
					<td class="column" align="center">
					  <a href="${activationLink}" class="button">Confirm</a>
					</td>
				  </tr>
				</table>
			  </td>
			</tr>
		  </table>
		</td>
	  </tr>
	</table>
  </body>
  </html>
    
    `;
};

const verifyedFailed = () => {};

export { verifyRequest, verifyedSuccess, verifyedFailed };

import nodemailer, { Transporter } from 'nodemailer'
import config from '../config'
import { IEmailData } from '../interface/emailData'

const sendEmail = async (data: IEmailData): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.mail_id,
      pass: config.mail_pass,
    },
  })

  await transporter.sendMail({
    from: 'squeakit001@gmail.com',
    to: data.to,
    subject: data.subject,
    text: `Inifinity`,
    html: `<!DOCTYPE HTML
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
        <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>

        <style type="text/css">
            @media only screen and (min-width: 620px) {
                .u-row {
                    width: 600px !important;
                }

                .u-row .u-col {
                    vertical-align: top;
                }

                .u-row .u-col-50 {
                    width: 300px !important;
                }

                .u-row .u-col-100 {
                    width: 600px !important;
                }

            }

            @media (max-width: 620px) {
                .u-row-container {
                    max-width: 100% !important;
                    padding-left: 0px !important;
                    padding-right: 0px !important;
                }

                .u-row .u-col {
                    min-width: 320px !important;
                    max-width: 100% !important;
                    display: block !important;
                }

                .u-row {
                    width: 100% !important;
                }

                .u-col {
                    width: 100% !important;
                }

                .u-col>div {
                    margin: 0 auto;
                }
            }

            body {
                margin: 0;
                padding: 0;
            }

            table,
            tr,
            td {
                vertical-align: top;
                border-collapse: collapse;
            }

            p {
                margin: 0;
            }

            .ie-container table,
            .mso-container table {
                table-layout: fixed;
            }

            * {
                line-height: inherit;
            }

            a[x-apple-data-detectors='true'] {
                color: inherit !important;
                text-decoration: none !important;
            }

            table,
            td {
                color: #000000;
            }

            #u_body a {
                color: #161a39;
                text-decoration: underline;
            }

            @media (max-width: 480px) {
                #u_row_6 .v-row-columns-background-color-background-color {
                    background-color: #131921 !important;
                }

                #u_content_text_7 .v-text-align {
                    text-align: center !important;
                }

                #u_content_social_1 .v-container-padding-padding {
                    padding: 10px 10px 10px 29px !important;
                }

                #u_content_text_6 .v-container-padding-padding {
                    padding: 11px 29px 10px 0px !important;
                }

                #u_content_text_6 .v-text-align {
                    text-align: center !important;
                }

                #u_content_text_11 .v-text-align {
                    text-align: center !important;
                }
            }
        </style>

        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css">
        <!--<![endif]-->

    </head>

    <body class="clean-body u_body"
        style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table id="u_body"
            style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%"
            cellpadding="0" cellspacing="0">
            <tbody>
                <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->

                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row v-row-columns-background-color-background-color"
                                style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #131921;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr class="v-row-columns-background-color-background-color" style="background-color: #131921;"><![endif]-->

                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->

                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding"
                                                                style="overflow-wrap:break-word;word-break:break-word;padding:35px 10px 10px;font-family:'Lato',sans-serif;"
                                                                align="left">

                                                                <table width="100%" cellpadding="0" cellspacing="0"
                                                                    border="0">
                                                                    <tr>
                                                                        <td class="v-text-align"
                                                                            style="padding-right: 0px;padding-left: 0px;"
                                                                            align="center">

                                                                            <a href=""><img align="center" border="0"
                                                                                    src="https://www.unikainfocom.in/file/2017/06/Logo-Design.png"
                                                                                    alt="Image" title="Image"
                                                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 30%;max-width: 174px;"
                                                                                    width="174" /></a>

                                                                        </td>
                                                                    </tr>
                                                                </table>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding"
                                                                style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Lato',sans-serif;"
                                                                align="left">

                                                                <div class="v-text-align"
                                                                    style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                    <p
                                                                        style="font-size: 14px; line-height: 140%; text-align: center;">
                                                                        <span
                                                                            style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;">${data.subject}</span>
                                                                    </p>
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div><!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>

                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row v-row-columns-background-color-background-color"
                                style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr class="v-row-columns-background-color-background-color" style="background-color: #ffffff;"><![endif]-->

                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->

                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding"
                                                                style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;"
                                                                align="left">

                                                                <div class="v-text-align"
                                                                    style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 140%;"><span
                                                                            style="font-size: 18px; line-height: 25.2px; color: #666666;">Hello,
                                                                            ${data?.receiver} </span></p>
                                                                    <p style="font-size: 14px; line-height: 140%;"> </p>
                                                                    <p style="font-size: 14px; line-height: 140%;"><span
                                                                            style="font-size: 18px; line-height: 25.2px; color: #666666;">We
                                                                            have sent you this
                                                                            email in response to your request to
                                                                            ${data.subject} on
                                                                            <em><strong>Infinity</strong></em>.
                                                                            <em><strong>This link is valid till ${data?.expTime}
                                                                                    form request time</strong></em></span>
                                                                    </p>
                                                                    <p style="font-size: 14px; line-height: 140%;"> </p>
                                                                    <p style="font-size: 14px; line-height: 140%;"><span
                                                                            style="font-size: 18px; line-height: 25.2px; color: #666666;">To
                                                                            ${data.subject}, please follow the link below:
                                                                        </span>
                                                                    </p>
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding"
                                                                style="overflow-wrap:break-word;word-break:break-word;padding:0px 40px;font-family:'Lato',sans-serif;"
                                                                align="left">

                                                                <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                                                <div class="v-text-align" align="left">
                                                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:52px; v-text-anchor:middle; width:205px;" arcsize="19%"  stroke="f" fillcolor="#131921"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Lato',sans-serif;"><![endif]-->
                                                                    <a href="${data.link}" target="_blank" class="v-button"
                                                                        style="box-sizing: border-box;display: inline-block;font-family:'Lato',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #131921; border-radius: 10px;-webkit-border-radius: 10px; -moz-border-radius: 10px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 18px;">
                                                                        <span
                                                                            style="display:block;padding:15px 40px;line-height:120%;"><span
                                                                                style="line-height: 21.6px;">${data.button_text}</span></span>
                                                                    </a>
                                                                    <!--[if mso]></center></v:roundrect><![endif]-->
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding"
                                                                style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;"
                                                                align="left">

                                                                <div class="v-text-align"
                                                                    style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 140%;"><span
                                                                            style="color: #888888; font-size: 14px; line-height: 19.6px;"><em><span
                                                                                    style="font-size: 16px; line-height: 22.4px;">Please
                                                                                    ignore this email if you
                                                                                    did not request</span></em></span><br /><span
                                                                            style="color: #888888; font-size: 14px; line-height: 19.6px;"><em><span
                                                                                    style="font-size: 16px; line-height: 22.4px;">
                                                                                </span></em></span></p>
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div><!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>

                        <div id="u_row_6" class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row v-row-columns-background-color-background-color"
                                style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #131921;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr class="v-row-columns-background-color-background-color" style="background-color: #131921;"><![endif]-->

                                    <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 20px 20px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-50"
                                        style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 20px 20px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->

                                                <table id="u_content_text_7" style="font-family:'Lato',sans-serif;"
                                                    role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                    border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding"
                                                                style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;"
                                                                align="left">

                                                                <div class="v-text-align"
                                                                    style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 140%;"><span
                                                                            style="font-size: 16px; line-height: 22.4px; color: #ecf0f1;">Contact</span>
                                                                    </p>
                                                                    <p style="font-size: 14px; line-height: 140%;"><span
                                                                            style="font-size: 14px; line-height: 19.6px; color: #ecf0f1;">Company_location,</span>
                                                                    </p>
                                                                    <p style="font-size: 14px; line-height: 140%;"><span
                                                                            style="font-size: 14px; line-height: 19.6px; color: #ecf0f1;">phone_number
                                                                            |
                                                                            email</span></p>
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div><!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px 0px 0px 20px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-50"
                                        style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 0px 0px 0px 20px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->

                                                <table id="u_content_social_1" style="font-family:'Lato',sans-serif;"
                                                    role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                    border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding"
                                                                style="overflow-wrap:break-word;word-break:break-word;padding:36px 10px 10px;font-family:'Lato',sans-serif;"
                                                                align="left">

                                                                <div align="middle">
                                                                    <div
                                                                        style="display: table; max-width:234px; margin: 0 0 0 -30px;">
                                                                        <!--[if (mso)|(IE)]><table width="234" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="left"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:234px;"><tr><![endif]-->

                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                                                                        <table align="left" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href=" " title="Twitter"
                                                                                            target="_blank">
                                                                                            <img src="images/image-5.png"
                                                                                                alt="Twitter"
                                                                                                title="Twitter" width="32"
                                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->

                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                                                                        <table align="left" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href=" " title="Facebook"
                                                                                            target="_blank">
                                                                                            <img src="images/image-1.png"
                                                                                                alt="Facebook"
                                                                                                title="Facebook" width="32"
                                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->

                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                                                                        <table align="left" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href=" " title="Instagram"
                                                                                            target="_blank">
                                                                                            <img src="images/image-3.png"
                                                                                                alt="Instagram"
                                                                                                title="Instagram" width="32"
                                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->

                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                                                                        <table align="left" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href=" " title="LinkedIn"
                                                                                            target="_blank">
                                                                                            <img src="images/image-4.png"
                                                                                                alt="LinkedIn"
                                                                                                title="LinkedIn" width="32"
                                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->

                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                                                        <table align="left" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href="https://email.com/"
                                                                                            title="Email" target="_blank">
                                                                                            <img src="images/image-2.png"
                                                                                                alt="Email" title="Email"
                                                                                                width="32"
                                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->

                                                                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                                                    </div>
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table id="u_content_text_6" style="font-family:'Lato',sans-serif;"
                                                    role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                    border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding"
                                                                style="overflow-wrap:break-word;word-break:break-word;padding:11px 10px 10px;font-family:'Lato',sans-serif;"
                                                                align="left">

                                                                <div class="v-text-align"
                                                                    style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                    <p style="line-height: 140%; font-size: 14px;"><span
                                                                            style="font-size: 14px; line-height: 19.6px;"><span
                                                                                style="color: #ecf0f1; font-size: 14px; line-height: 19.6px;"><span
                                                                                    style="line-height: 19.6px; font-size: 14px;">Company_name
                                                                                    © All Rights
                                                                                    Reserved</span></span></span></p>
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div><!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>

                        <div class="u-row-container" style="padding: 0px;background-color: #f9f9f9">
                            <div class="u-row v-row-columns-background-color-background-color"
                                style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #131921;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f9f9f9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr class="v-row-columns-background-color-background-color" style="background-color: #131921;"><![endif]-->

                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->

                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding"
                                                                style="overflow-wrap:break-word;word-break:break-word;padding:6px;font-family:'Lato',sans-serif;"
                                                                align="left">

                                                                <table height="0px" align="center" border="0"
                                                                    cellpadding="0" cellspacing="0" width="100%"
                                                                    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #bdc3ce;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                    <tbody>
                                                                        <tr style="vertical-align: top">
                                                                            <td
                                                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                                <span>&#160;</span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div><!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>

                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row v-row-columns-background-color-background-color"
                                style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #131921;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr class="v-row-columns-background-color-background-color" style="background-color: #131921;"><![endif]-->

                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->

                                                <table id="u_content_text_11" style="font-family:'Lato',sans-serif;"
                                                    role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                    border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding"
                                                                style="overflow-wrap:break-word;word-break:break-word;padding:16px 40px 16px 20px;font-family:'Lato',sans-serif;"
                                                                align="left">

                                                                <div class="v-text-align"
                                                                    style="line-height: 0%; text-align: center; word-wrap: break-word;">
                                                                    <p style="line-height: 0%;"><span
                                                                            style="color: #f1c40f; line-height: 0px;"><span
                                                                                style="color: #ffffff; line-height: 0px;">Design
                                                                                &amp; Developed by</span>
                                                                            <strong><em><a rel="noopener"
                                                                                        href="https://www.imshama.com/"
                                                                                        target="_blank"
                                                                                        style="color: #f1c40f;">Abu
                                                                                        Shama</a></em></strong></span></p>
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div><!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>

                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    </td>
                </tr>
            </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
    </body>

    </html>`,
  })
}

export default sendEmail
